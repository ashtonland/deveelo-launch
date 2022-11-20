"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../../models/Post"));
const postsResolvers = {
    Query: {
        getPosts: async (_parent, { number }, _context) => {
            try {
                const posts = await Post_1.default.find().sort({ _id: -1 }).limit(number);
                return posts;
            }
            catch (err) {
                throw new Error(err);
            }
        },
    },
};
exports.default = postsResolvers;
//# sourceMappingURL=posts.js.map