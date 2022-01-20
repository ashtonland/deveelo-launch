"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_middleware_1 = require("graphql-middleware");
const schema_1 = require("@graphql-tools/schema");
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const typeDefs_1 = require("./graphql/typeDefs");
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const middleware_1 = require("./graphql/middleware");
const User_1 = __importDefault(require("./models/User"));
const auth_1 = require("./util/auth");
const initServer = async () => {
    const app = express_1.default();
    app.set("trust proxy", process.env.NODE_ENV !== "production");
    const whitelist = process.env.NODE_ENV === "production" ? ["https://www.deveelo.com", "https://next.deveelo.com"] : ["http://localhost:3000"];
    app.use(cors_1.default({
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    }));
    app.use(cookie_parser_1.default());
    app.get("/", (_req, res) => res.send("hello"));
    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies.lid;
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
            console.log("not signed in");
        }
        let payload = null;
        try {
            payload = jsonwebtoken_1.verify(token, process.env.REFRESH_TOEKEN_SECRET);
        }
        catch (error) {
            console.log(error);
            return res.send({ ok: false, accessToken: "" });
        }
        const user = await User_1.default.findById(payload.id);
        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }
        if (user.account.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }
        auth_1.sendRefreshToken(res, auth_1.createRefreshToken(user));
        return res.send({ ok: true, accessToken: auth_1.createAccessToken(user) });
    });
    const schema = schema_1.makeExecutableSchema({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.default,
    });
    const middleware = [...middleware_1.authMiddlewares];
    const schemaWithMiddleware = graphql_middleware_1.applyMiddleware(schema, ...middleware);
    const server = new apollo_server_express_1.ApolloServer({
        schema: schemaWithMiddleware,
        context: ({ req, res }) => ({ req, res }),
    });
    await server.start();
    server.applyMiddleware({
        app,
        cors: false,
    });
    mongoose_1.default
        .connect(process.env.MONGODB_KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
        console.log("📬 - database connected");
        return app.listen(parseInt(process.env.PORT), () => {
            console.log(`🚀 - Server running at http://localhost:4000`);
        });
    });
};
initServer().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map