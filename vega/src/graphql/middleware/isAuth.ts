import { verify } from "jsonwebtoken";
import { sendRefreshToken } from "../../util/auth";
import { NewIMiddlewareResolver } from "src/util/middlewareType";

const loggedInOnlyAuth: NewIMiddlewareResolver = async (resolve, _parent, _args, context, _info) => {
	try {
		//header looks like: bearer 1234abcd...
		const authorization = context.req.headers["authorization"];
		//console.log(`looking for header "authorization" in context headers:\n${JSON.stringify(context.req.headers)}`);

		if (!authorization) {
			//either not auth or user loggedout but navbar still tries to load name and pfp
			sendRefreshToken(context.res, "");
			throw new Error("not authenticated [no header]");
		}

		try {
			const token = authorization.split(" ")[1];
			const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
			context.payload = payload as any;
		} catch (err) {
			sendRefreshToken(context.res, "");
			throw new Error("not authenticated [fail]");
		}

		const result = await resolve(_parent, _args, context, _info);

		return result;
	} catch (error) {
		return null;
	}
};

export const isAuth = {
	Query: {
		myAccount: loggedInOnlyAuth,
	},
	Mutation: {
		logout: loggedInOnlyAuth,
		follow: loggedInOnlyAuth,
		unfollow: loggedInOnlyAuth,
	},
};
