import { verify } from "jsonwebtoken";
import { NewIMiddlewareResolver } from "src/util/middlewareType";

const loggedInOnlyAuth: NewIMiddlewareResolver = async (resolve, _parent, _args, context, _info) => {
	//header looks like: bearer 1234abcd...

	const authorization = context.req.headers["authorization"];
	//console.log(`looking for header "authorization" in context headers:\n${JSON.stringify(context.req.headers)}`);

	if (!authorization) {
		throw new Error("not authenticated");
	}

	try {
		const token = authorization.split(" ")[1];
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
		context.payload = payload as any;
	} catch (err) {
		throw new Error("not authenticated [fail]");
	}

	const result = await resolve(_parent, _args, context, _info);

	return result;
};

export const isAuth = {
	Query: {
		myAccount: loggedInOnlyAuth,
	},
};
