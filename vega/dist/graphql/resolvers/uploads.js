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
const uploadsResolvers = {
    Mutation: {
        singleUpload: async (_parent, { file, type, edata }, { payload }) => {
            let savePath;
            let imageOptimization = null;
            let allowedExtensions;
            let document;
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
                    break;
                default:
                    throw new Error("No valid type --banner, pfp, etc-- passed in as a prop with this upload");
            }
            const { createReadStream, filename, mimetype, encoding } = await file;
            const name = filename;
            const extension = name.split(".")[1];
            const { errors, valid } = validators_1.validateFileExtensions(extension, allowedExtensions);
            if (!valid) {
                throw new apollo_server_express_1.UserInputError(errors.file);
            }
            const generateName = () => {
                const idonly = type === "pfp" || type === "banner";
                if (idonly) {
                    return `${payload === null || payload === void 0 ? void 0 : payload.id}.webp`;
                }
                else {
                    const time = Date.now();
                    return `${payload === null || payload === void 0 ? void 0 : payload.id}${time}.${extension}`;
                }
            };
            const saveName = generateName();
            try {
                if (type === "pfp") {
                    await User_1.default.findByIdAndUpdate(payload.id, { $set: { "profile.pictureUrl": `/pfps/${saveName}` } }, { useFindAndModify: false });
                }
                else if (type === "banner") {
                    await User_1.default.findByIdAndUpdate(payload.id, { $set: { "profile.bannerUrl": `/banners/${saveName}` } }, { useFindAndModify: false });
                }
                else if (type === "post") {
                    await Post_1.default.init();
                    const newPost = new Post_1.default({
                        imageUrls: [`/posts/${saveName}`],
                        body: edata.field1,
                        tags: edata.field2,
                        createdAt: new Date().toISOString(),
                        username: edata.field3,
                        user: {
                            type: new mongodb_1.ObjectID(payload === null || payload === void 0 ? void 0 : payload.id),
                            ref: "users",
                        },
                        comments: [],
                        likes: [],
                    });
                    try {
                        await newPost.save();
                        document = await Post_1.default.findById(newPost._id);
                    }
                    catch (error) {
                        throw new Error("Unable to save post to database");
                    }
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
                    throw new Error("Error when saving new file name to variable array storage of uploaded files");
            }
            const user = await User_1.default.findById(new mongodb_1.ObjectID(payload.id));
            if (!user) {
                throw new Error("account not found");
            }
            return {
                user: user,
                file: {
                    filename: saveName,
                    mimetype: mimetype,
                    encoding: encoding,
                },
                doc: document ? JSON.stringify(document) : null,
            };
        },
    },
};
exports.default = uploadsResolvers;
//# sourceMappingURL=uploads.js.map