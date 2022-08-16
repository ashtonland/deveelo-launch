"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachPayloadIfPossible = exports.loggedInOnlyAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = require("../../util/auth");
const loggedInOnlyAuth = () => (next) => async (parent, args, context, info) => {
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
        const result = await next(parent, args, context, info);
        return result;
    }
    catch (error) {
        return null;
    }
};
exports.loggedInOnlyAuth = loggedInOnlyAuth;
const attachPayloadIfPossible = () => (next) => async (parent, args, context, info) => {
    try {
        const authorization = context.req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
        context.payload = payload;
        const result = await next(parent, args, context, info);
        return result;
    }
    catch (error) {
        return await next(parent, args, context, info);
    }
};
exports.attachPayloadIfPossible = attachPayloadIfPossible;
//# sourceMappingURL=isAuth.js.map