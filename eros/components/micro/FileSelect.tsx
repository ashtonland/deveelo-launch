import { useRef, useState } from "react";

import { useUploadSingleMutation, MyAccountMinProfileDocument, MyNameAndPfpDocument, MyNameAndPfpQuery, MyAccountMinProfileQuery } from "../../hooks/backend/generated/graphql";
import { checkFileSize } from "../../hooks/inputUtils";
import { updateSidebar } from "../../hooks/socialhooks";
import uploadStyles from "../../styles/micro/fileupload.module.css";

const refetchTypes = ["pfp", "banner"];

interface FileAreaInput {
	type: string;
	text?: string;
	maxSize: "1mb" | "2mb" | "5mb";
}

export const FileSelectArea = ({ type, text, maxSize }: FileAreaInput) => {
	const storage = window.localStorage;
	/* No.1 */
	//prevents sending multiple requests (happens automatically ¯\_(ツ)_/¯)
	//this system is not needed for post uploads b/c those only upload once on
	//form submit, this can happen multiple times due to the automatic and
	//buttonless nature of uploading a new pfp or banner
	if (storage.getItem(`${type}file`) === undefined) {
		storage.setItem(`${type}file`, "");
	}
	const [newFile, setNewFile] = useState<File>();
	const [error, setError] = useState("");
	const isError = error !== "";

	//limit refetch to pfp and banner queries
	const refetch = refetchTypes.includes(type);
	const options = {
		refetchQueries: [{ query: MyAccountMinProfileDocument }, { query: MyNameAndPfpDocument }],
	};

	//after changing the pictures, we will refetch the queries which use them
	const [uploadSingle] = useUploadSingleMutation(refetch ? options : null);

	const handleNewUpload = async () => {
		if (!newFile || isError) {
			return;
		}

		/* No.2 */
		//in case they uploaded literally the same file, or the component rerenders
		//for some reason & therefore attempts to reupload the same file. Compare the
		//current upload to the last successful upload: if the same, cancel
		const lastFileName = storage.getItem(`${type}file`);
		if (newFile.name === lastFileName) {
			return;
		}
		/* No.3 */
		//set last file name to this one now
		//(storing the last successful upload)
		storage.setItem(`${type}file`, newFile.name);

		const response = await uploadSingle({
			variables: {
				file: newFile,
				type: type,
			},
			update: (store, { data }) => {
				if (!data || !refetch) {
					return null;
				}

				//remember, the filename is: <payload.id>.webp
				//therefore it does not change on upload after
				//the first time which is default to custom
				const saveName = data.singleUpload.file.filename;

				store.writeQuery<MyNameAndPfpQuery>({
					query: MyNameAndPfpDocument,
					data: {
						myAccount: {
							_id: data.singleUpload.user._id,
							account: {
								username: data.singleUpload.user.account.username,
								tag: data.singleUpload.user.account.tag,
							},
							profile: {
								pictureUrl: data.singleUpload.user.profile.pictureUrl,
							},
						},
					},
				});
				//update cache for minprofile query (update sidebar)
				store.writeQuery<MyAccountMinProfileQuery>({
					query: MyAccountMinProfileDocument,
					data: {
						myAccount: data.singleUpload.user,
					},
				});
				console.log("cache updated with user: \n" + JSON.stringify(data.singleUpload.user));
			},
		});

		if (response && response.data) {
			if (refetch) {
				//rerender the sidebar and fetch the image again (which will return the new image)
				//*thanks to our cache breaker in the custom next image loader
				updateSidebar(null);
			}
		}
	};
	//route click on overlay to invisible file upload button
	const fileInput = useRef<HTMLInputElement>();

	const selectFile = () => {
		if (fileInput && fileInput.current) {
			fileInput.current.click();
		}
	};

	const showText: boolean = text !== undefined;
	if (newFile) {
		text = newFile.name;

		//we can also assume that the use has successfully uploaded a new image so upload it:
		handleNewUpload();
	}

	if (isError) {
		text = error;
	}

	return (
		<button className={uploadStyles.fillOverlay} onClick={selectFile}>
			<input
				type="file"
				id={`${type}file`}
				style={{ display: "none" }}
				ref={fileInput}
				accept="image/png, image/jpeg, image/jfif, image/webp, image/avif"
				onChange={(e) => {
					const file = e.target.files[0];

					const pass = checkFileSize(file.size, maxSize);
					if (pass) {
						setNewFile(file);
						setError("");
					} else {
						setError(`Over the ${maxSize} upload limit`);
					}
				}}
			/>
			<div className={uploadStyles.content}>
				{/* handles compensating for the uncentered icon + sign pushes it left) */}
				<div className={uploadStyles.imageOffsetWrapper}>
					<img src="/resources/uploadAreaIcon.svg" className={isError ? uploadStyles.errorIcon : uploadStyles.icon} />
				</div>
				{showText ? <p className={isError ? uploadStyles.error : uploadStyles.subtitle}>{text}</p> : null}
			</div>
		</button>
	);
};
