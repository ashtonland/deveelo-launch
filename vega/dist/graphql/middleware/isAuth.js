"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const loggedInOnlyAuth = async (resolve, _parent, _args, context, _info) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
        throw new Error("not authenticated");
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
        context.payload = payload;
    }
    catch (err) {
        throw new Error("not authenticated [fail]");
    }
    const result = await resolve(_parent, _args, context, _info);
    return result;
};
exports.isAuth = {
    Query: {
        myAccount: loggedInOnlyAuth,
    },
};
//# sourceMappingURL=isAuth.js.map