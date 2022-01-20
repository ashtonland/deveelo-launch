"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeRefreshTokensForUser = void 0;
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const userTag = "";
const revokeRefreshTokensForUser = async (tag) => {
    const user = await User_1.default.findOne({ "account.tag": tag });
    if (!user) {
        return console.log(`⛔ - no user found with tag: ${tag}`);
    }
    const currVersion = user.account.tokenVersion + 1;
    try {
        await User_1.default.updateOne({ "account.tag": tag }, { $set: { "account.tokenVersion": currVersion } });
        console.log(`📁 - Successfully changed token version for ${user.account.username} (@${user.account.tag}) to ${currVersion}`);
        return;
    }
    catch (error) {
        console.log(error);
        console.log(`⛔ - Error updating user token`);
    }
};
exports.revokeRefreshTokensForUser = revokeRefreshTokensForUser;
mongoose_1.default
    .connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
    await exports.revokeRefreshTokensForUser(userTag);
});
//# sourceMappingURL=revokeUserToken.js.map