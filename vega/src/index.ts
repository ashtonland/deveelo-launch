import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { applyMiddleware as applyGqlMiddle } from "graphql-middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { verify } from "jsonwebtoken";
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { typeDefs } from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { authMiddlewares } from "./graphql/middleware";
import User, { UserType } from "./models/User";
import { createAccessToken, createRefreshToken, sendRefreshToken } from "./util/auth";

// development  change mongodb user password & access
const initServer = async () => {
	const app = express();
	app.set("trust proxy", process.env.NODE_ENV !== "production");

	const whitelist = process.env.NODE_ENV === "production" ? ["https://www.deveelo.com", "https://next.deveelo.com", "https://deveelo.vercel.app"] : ["http://localhost:3000"];

	app.use(
		cors({
			origin: function (origin: any, callback: any) {
				//DO NOT EVER CHANGE
				if (whitelist.indexOf(origin!) !== -1 || process.env.NODE_ENV !== "production") {
					callback(null, true);
				} else {
					callback(new Error("Not allowed by CORS"));
				}
			},
			credentials: true,
		})
	); // development  enable real cors options above

	app.use(cookieParser());

	//api routes
	app.get("/", (_req, res) => res.send("hello"));
	app.post("/refresh_token", async (req, res) => {
		//check if refresh token is correct & send new access token
		const token = req.cookies.lid;
		if (!token) {
			//they are not signed in
			return res.send({ ok: false, accessToken: "" });
			console.log("not signed in");
		}

		let payload: any = null;
		try {
			payload = verify(token, process.env.REFRESH_TOEKEN_SECRET!);
		} catch (error) {
			console.log(error);
			return res.send({ ok: false, accessToken: "" });
		}

		//token is valid, send access token
		const user: UserType = await User.findById(payload.id);

		if (!user) {
			return res.send({ ok: false, accessToken: "" });
		}

		//check if token version is the latest
		if (user.account.tokenVersion !== payload.tokenVersion) {
			return res.send({ ok: false, accessToken: "" });
		}

		//refresh the refresh token
		sendRefreshToken(res, createRefreshToken(user));

		//login the user (send access token)
		return res.send({ ok: true, accessToken: createAccessToken(user) });
	});

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers,
	});

	const middleware = [...authMiddlewares];
	const schemaWithMiddleware = applyGqlMiddle(schema, ...middleware);

	const server = new ApolloServer({
		schema: schemaWithMiddleware,
		context: ({ req, res }) => ({ req, res }),
	});

	await server.start();

	server.applyMiddleware({
		app,
		cors: false,
	});

	//connect to the mongodb database
	mongoose
		.connect(process.env.MONGODB_KEY!, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("📬 - database connected");
			return app.listen(parseInt(process.env.PORT!), () => {
				console.log(`🚀 - Server running at http://localhost:4000`);
			});
		});
};

initServer().catch((err) => {
	console.log(err);
});
