import { verify } from "jsonwebtoken";
import { sendRefreshToken } from "../../util/auth";
import { MyResolversComposition } from "src/util/middlewareType";

export const loggedInOnlyAuth = (): MyResolversComposition => (next) => async (parent, args, context, info) => {
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

		//after our check, we can run the actual resolver, we could modify the return
		//before it is sent by catching the result (as we do with @param result), but
		//I simply return the result as is, no need to change the return for this middleware
		const result = await next(parent, args, context, info);

		return result;
	} catch (error) {
		return null;
	}
};

//do not use as authentication
//simpily sends with payload if logged in, i.e. we can exclude outselves from the random sampling of users
//for the people widget by excluding our payloa.id, if no payload, no need to exclude anything bc logged out
export const attachPayloadIfPossible = (): MyResolversComposition => (next) => async (parent, args, context, info) => {
	try {
		//header looks like: bearer 1234abcd...
		const authorization = context.req.headers["authorization"];

		//@ts-ignore we want it to be error prone, if error, we know we are logged out and
		//can use the catch to run the resolve with this knowledge
		const token = authorization.split(" ")[1];
		const payload = verify(token as string, process.env.ACCESS_TOKEN_SECRET!);
		context.payload = payload as any;

		//logged in
		const result = await next(parent, args, context, info);

		return result;
	} catch (error) {
		return await next(parent, args, context, info);
	}
};
