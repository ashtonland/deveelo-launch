"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    imageUrls: [String],
    body: String,
    tags: [String],
    createdAt: String,
    username: String,
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [
        {
            body: String,
            imageUrl: String,
            user: {
                username: String,
                tag: String,
                picutreUrl: String,
                status: String,
            },
        },
    ],
    likes: [
        {
            user: {
                username: String,
                tag: String,
                picutreUrl: String,
                status: String,
            },
            createdAt: String,
        },
    ],
});
exports.default = mongoose_1.model("Post", postSchema);
//# sourceMappingURL=Post.js.map