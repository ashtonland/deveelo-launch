"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    account: {
        username: String,
        tag: String,
        short: String,
        password: String,
        email: String,
        createdAt: String,
        lastOnline: String,
        private: Boolean,
        blockedIds: [String],
        tokenVersion: {
            type: Number,
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: "{VALUE} is not an integer value",
            },
        },
        pro: Boolean,
    },
    profile: {
        bannerUrl: String,
        pictureUrl: String,
        description: String,
        followingIds: [String],
        followerIds: [String],
        friendIds: [String],
        friendRqIds: [String],
        badges: [String],
        linkedProfiles: [String],
    },
    status: String,
    social: {
        postIds: [String],
        blogIds: [String],
        groupIds: [String],
        betaIds: {
            hostedIds: [String],
            joinedIds: [String],
        },
        chatIds: [String],
    },
});
exports.default = mongoose_1.model("User", userSchema);
//# sourceMappingURL=User.js.map