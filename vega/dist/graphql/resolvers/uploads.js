"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const mongodb_1 = require("mongodb");
const validators_1 = require("../../util/validators");
const apollo_server_express_1 = require("apollo-server-express");
const User_1 = __importDefault(require("../../models/User"));
const Post_1 = __importDefault(require("../../models/Post"));
const contentDir = "public/uploads/";
let uploadedPfps;
let uploadedBanners;
fs_1.default.readdir(contentDir + "pfps/", (err, files) => {
    if (err) {
        console.log(`Error fetching all pfp file names from dir: ${contentDir} \n The error was: \n ${err}`);
    }
    else {
        uploadedPfps !== null && uploadedPfps !== void 0 ? uploadedPfps : (uploadedPfps = files);
        console.log("🦄 Profile picture filenames fetched and saved");
    }
});
fs_1.default.readdir(contentDir + "banners/", (err, files) => {
    if (err) {
        console.log(`Error fetching all banner file names from dir: ${contentDir} \n The error was: \n ${err}`);
    }
    else {
        uploadedBanners !== null && uploadedBanners !== void 0 ? uploadedBanners : (uploadedBanners = files);
        console.log("🍧 Banner filenames fetched and saved");
    }
});
const generateName = (type, id, fileExtention) => {
    const idonly = type === "pfp" || type === "banner";
    if (idonly) {
        return `${id}.webp`;
    }
    else {
        const time = Date.now();
        return `${id}${time}.${fileExtention}`;
    }
};
const uploadsResolvers = {
    Mutation: {
        singleUpload: async (_parent, { file, type, edata }, { payload }) => {
            let savePath;
            let imageOptimization = null;
            let allowedExtensions;
            const { createReadStream, filename, mimetype, encoding } = await file;
            const name = filename;
            let extension = name.split(".")[1];
            switch (type) {
                case "pfp":
                    savePath = contentDir + "pfps";
                    allowedExtensions = ["png", "jpg", "jpeg", "webp", "jfif", "avif"];
                    imageOptimization = sharp_1.default()
                        .resize({
                        width: 400,
                        height: 400,
                        fit: "cover",
                    })
                        .webp({ quality: 75 });
                    break;
                case "banner":
                    savePath = contentDir + "banners";
                    allowedExtensions = ["png", "jpg", "jpeg", "webp", "jfif", "avif"];
                    imageOptimization = sharp_1.default()
                        .resize({
                        width: 990,
                        height: 687,
                        fit: "cover",
                    })
                        .webp({ quality: 75 });
                    break;
                case "post":
                    savePath = contentDir + "posts";
                    allowedExtensions = ["png", "jpg", "jpeg", "webp", "jfif", "avif", "mov", "mp4"];
                    const pictureExtsns = ["png", "jpg", "jpeg", "webp", "jfif", "avif"];
                    if (pictureExtsns.includes(extension.toLowerCase())) {
                        extension = "webp";
                        imageOptimization = sharp_1.default()
                            .resize({
                            width: 1920,
                            height: 1080,
                            fit: "cover",
                        })
                            .webp({ quality: 75 });
                    }
                    break;
                default:
                    throw new Error("No valid type --banner, pfp, etc-- passed in as a prop with this upload");
            }
            const { errors, valid } = validators_1.validateFileExtensions(extension, allowedExtensions);
            if (!valid) {
                throw new apollo_server_express_1.UserInputError(errors.file);
            }
            const saveName = generateName(type, payload === null || payload === void 0 ? void 0 : payload.id, extension);
            try {
                if (type === "pfp") {
                    await User_1.default.findByIdAndUpdate(payload.id, { $set: { "profile.pictureUrl": `/pfps/${saveName}` } }, { useFindAndModify: false });
                }
                else if (type === "banner") {
                    await User_1.default.findByIdAndUpdate(payload.id, { $set: { "profile.bannerUrl": `/banners/${saveName}` } }, { useFindAndModify: false });
                }
            }
            catch (err) {
                throw new Error("Error finding and updating user's pfp or banner image on new upload");
            }
            if (imageOptimization) {
                await new Promise((res) => createReadStream()
                    .pipe(imageOptimization)
                    .pipe(fs_1.default.createWriteStream(path_1.default.join(savePath, saveName)))
                    .on("close", res));
            }
            else {
                await new Promise((res) => createReadStream()
                    .pipe(fs_1.default.createWriteStream(path_1.default.join(savePath, saveName)))
                    .on("close", res));
            }
            switch (type) {
                case "pfp":
                    if (!uploadedPfps.includes(saveName)) {
                        uploadedPfps.push(saveName);
                    }
                    break;
                case "banner":
                    if (!uploadedBanners.includes(saveName)) {
                        uploadedBanners.push(saveName);
                    }
                    break;
                default:
                    break;
            }
            const user = await User_1.default.findById(new mongodb_1.ObjectID(payload.id));
            if (!user) {
                throw new Error("account not found");
            }
            if (type === "post") {
                if (edata === undefined) {
                    throw new Error("No extra data (body, tags, etc) provided alongside the file upload. Cancelled.");
                }
                await Post_1.default.init();
                const newPost = new Post_1.default({
                    imageUrls: [`/posts/${saveName}`],
                    body: edata.field1,
                    tags: edata.field2,
                    createdAt: new Date().toISOString(),
                    user_id: new mongodb_1.ObjectID(payload === null || payload === void 0 ? void 0 : payload.id),
                    comments: [],
                    likes: [],
                });
                try {
                    await newPost.save();
                }
                catch (error) {
                    throw new Error("Unable to save post to database");
                }
                const post = newPost;
                return {
                    user,
                    file: {
                        filename: saveName,
                        mimetype: mimetype,
                        encoding: encoding,
                    },
                    doc: {
                        body: post.body,
                        text2: post.imageUrls[0],
                    },
                };
            }
            else {
                return {
                    user,
                    file: {
                        filename: saveName,
                        mimetype: mimetype,
                        encoding: encoding,
                    },
                };
            }
        },
    },
};
exports.default = uploadsResolvers;
//# sourceMappingURL=uploads.js.map