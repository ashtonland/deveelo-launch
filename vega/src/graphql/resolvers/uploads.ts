import fs from "fs";
import path from "path";
import sharp from "sharp";
import { ObjectID } from "mongodb";

import Context from "../../context";
import { validateFileExtensions } from "../../util/validators";
import { UserInputError } from "apollo-server-express";
import User, { UserType } from "../../models/User";
import Post, { PostType } from "../../models/Post";

const contentDir = "public/uploads/";
let uploadedPfps: string[];
let uploadedBanners: string[];

//on server start, fetch the names of the uploaded files
fs.readdir(contentDir + "pfps/", (err, files) => {
	if (err) {
		//log any error that occurs
		console.log(`Error fetching all pfp file names from dir: ${contentDir} \n The error was: \n ${err}`);
	} else {
		uploadedPfps ??= files;

		console.log("🦄 Profile picture filenames fetched and saved");
	}
});

fs.readdir(contentDir + "banners/", (err, files) => {
	if (err) {
		//log any error that occurs
		console.log(`Error fetching all banner file names from dir: ${contentDir} \n The error was: \n ${err}`);
	} else {
		uploadedBanners ??= files;
		console.log("🍧 Banner filenames fetched and saved");
	}
});

const generateName = (type: string, id: string | undefined, fileExtention: string) => {
	const idonly = type === "pfp" || type === "banner";

	if (idonly) {
		return `${id}.webp`;
	} else {
		//take the id + milliseconds since epoch .extension
		//= completely unique url for all nonpfp nonbanner uploads
		const time = Date.now();
		return `${id}${time}.${fileExtention}`;
	}
};

interface ExtraData {
	field1: string;
	field2: string;
	field3: string;
	field4: string;
}

const uploadsResolvers = {
	Mutation: {
		singleUpload: async (_parent: any, { file, type, edata }: { file: any; type: string; edata?: ExtraData }, { payload }: Context) => {
			//variables which control the different behaviors of the types of uploads
			//let existingUploads: string[];
			let savePath: string;
			let imageOptimization: any = null;
			let allowedExtensions: string[];

			//ACTUAL STUFF
			const { createReadStream, filename, mimetype, encoding } = await file;

			//split the name at the . and take the file extention
			const name = filename as string;
			let extension = name.split(".")[1];

			switch (type) {
				case "pfp":
					//existingUploads = uploadedPfps;
					//copy of image opts convertToWebpPfp;
					savePath = contentDir + "pfps";
					allowedExtensions = ["png", "jpg", "jpeg", "webp", "jfif", "avif"];
					imageOptimization = sharp()
						.resize({
							width: 400,
							height: 400,
							fit: "cover",
						})
						.webp({ quality: 75 });
					break;
				case "banner":
					//existingUploads = uploadedBanners;
					savePath = contentDir + "banners";
					allowedExtensions = ["png", "jpg", "jpeg", "webp", "jfif", "avif"];
					imageOptimization = sharp()
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

					//if this is a picture, optimize it. Would like to do the same for videos
					//but I do not want to mess w/ ffmpeg for the next week lol
					const pictureExtsns = ["png", "jpg", "jpeg", "webp", "jfif", "avif"];
					if (pictureExtsns.includes(extension.toLowerCase())) {
						//convert format to webp & change savepath extension to match
						extension = "webp";
						imageOptimization = sharp()
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

			//check if we recieved a supported image format, this is a secondary check
			//since the frontend only allows these in the file exporter, but if a direct req is sent?
			const { errors, valid } = validateFileExtensions(extension, allowedExtensions);
			if (!valid) {
				throw new UserInputError(errors.file);
			}

			//use the user id and/or time as the name
			const saveName = generateName(type, payload?.id, extension);

			//change the user's profile data if pfp or banner
			try {
				if (type === "pfp") {
					//update the user's pfp url to the current relative: i.e. /banners/blahblah.webp (frontend handles baseUrl)
					await User.findByIdAndUpdate(payload!.id, { $set: { "profile.pictureUrl": `/pfps/${saveName}` } }, { useFindAndModify: false });
				} else if (type === "banner") {
					//update the user's banner url to the new
					await User.findByIdAndUpdate(payload!.id, { $set: { "profile.bannerUrl": `/banners/${saveName}` } }, { useFindAndModify: false });
				}
			} catch (err) {
				throw new Error("Error finding and updating user's pfp or banner image on new upload");
			}

			//upload the file
			if (imageOptimization) {
				await new Promise((res) =>
					createReadStream()
						.pipe(imageOptimization)
						.pipe(fs.createWriteStream(path.join(savePath, saveName)))
						.on("close", res)
				);
			} else {
				await new Promise((res) =>
					createReadStream()
						.pipe(fs.createWriteStream(path.join(savePath, saveName)))
						.on("close", res)
				);
			}

			//store the filename in the array of uploads
			switch (type) {
				case "pfp":
					if (!uploadedPfps.includes(saveName)) {
						//we only need to replace the old file name, but since
						//filenames are = for a single user, we just do nothing
						//but, add the name if this is the first upload and one
						//does not exist already.
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

			//fetch the user AFTER we have changed their pfp or banner, nor before
			const user: UserType = await User.findById(new ObjectID(payload!.id));
			if (!user) {
				throw new Error("account not found");
			}

			if (type === "post") {
				if (edata === undefined) {
					throw new Error("No extra data (body, tags, etc) provided alongside the file upload. Cancelled.");
				}
				//create the post
				await Post.init();

				const newPost = new Post({
					imageUrls: [`/posts/${saveName}`],
					body: edata.field1,
					tags: edata.field2,
					createdAt: new Date().toISOString(),
					user_id: new ObjectID(payload?.id),
					comments: [],
					likes: [],
				});

				try {
					await newPost.save();
				} catch (error) {
					throw new Error("Unable to save post to database");
				}

				const post: PostType = newPost as any;

				// note  return for posts
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
			} else {
				// note  return for all but post uploads
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

export default uploadsResolvers;
