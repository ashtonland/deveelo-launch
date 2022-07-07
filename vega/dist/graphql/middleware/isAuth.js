"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = require("../../util/auth");
const loggedInOnlyAuth = async (resolve, _parent, _args, context, _info) => {
    try {
        const authorization = context.req.headers["authorization"];
        if (!authorization) {
            auth_1.sendRefreshToken(context.res, "");
            throw new Error("not authenticated [no header]");
        }
        try {
            const token = authorization.split(" ")[1];
            const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
            context.payload = payload;
        }
        catch (err) {
            auth_1.sendRefreshToken(context.res, "");
            throw new Error("not authenticated [fail]");
        }
        const result = await resolve(_parent, _args, context, _info);
        return result;
    }
    catch (error) {
        return null;
    }
};
exports.isAuth = {
    Query: {
        myAccount: loggedInOnlyAuth,
    },
    Mutation: {
        logout: loggedInOnlyAuth,
        follow: loggedInOnlyAuth,
        unfollow: loggedInOnlyAuth,
    },
};
//# sourceMappingURL=isAuth.js.map