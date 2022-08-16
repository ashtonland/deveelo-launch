"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomUsersBut = exports.getRandomUsers = exports.getRandomUser = void 0;
const mongodb_1 = require("mongodb");
const User_1 = __importDefault(require("../models/User"));
const getRandomUser = async (onlyId) => {
    let sampled = await User_1.default.aggregate([{ $match: { "profile.description": { $ne: "I'm new to Deveelo!" } } }, { $sample: { size: 1 } }]);
    const user = sampled[0];
    if (onlyId) {
        return user._id;
    }
    else {
        return user;
    }
};
exports.getRandomUser = getRandomUser;
const getRandomUsers = async (amount) => {
    let sampled = await User_1.default.aggregate([{ $match: { "profile.description": { $ne: "I'm new to Deveelo!" } } }, { $sample: { size: amount } }]);
    return sampled;
};
exports.getRandomUsers = getRandomUsers;
const getRandomUsersBut = async (amount, excludeId) => {
    let sampled = await User_1.default.aggregate([
        { $match: { "profile.description": { $ne: "I'm new to Deveelo!" } } },
        { $match: { _id: { $ne: new mongodb_1.ObjectID(excludeId) } } },
        { $sample: { size: amount } },
    ]);
    return sampled;
};
exports.getRandomUsersBut = getRandomUsersBut;
//# sourceMappingURL=sampleUsers.js.map