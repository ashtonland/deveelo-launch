"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    imageUrls: [String],
    body: String,
    tags: [String],
    createdAt: String,
    user_id: mongoose_1.Schema.Types.ObjectId,
    comments: [
        {
            body: String,
            imageUrl: String,
            user: {
                username: String,
                tag: String,
                pictureUrl: String,
            },
        },
    ],
    likes: [String],
});
exports.default = mongoose_1.model("Post", postSchema);
//# sourceMappingURL=Post.js.map