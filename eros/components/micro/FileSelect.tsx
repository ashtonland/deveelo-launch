import { useRef, useState } from "react";
import { useUploadSingleMutation, MyAccountMinProfileDocument, MyNameAndPfpDocument, MyNameAndPfpQuery } from "../../hooks/backend/generated/graphql";
import { checkFileSize } from "../../hooks/inputUtils";

import uploadStyles from "../../styles/micro/fileupload.module.css";

const refetchTypes = ["pfp", "banner"];

interface FileAreaInput {
	type: string;
	text?: string;
	maxSize: "1mb" | "2mb" | "5mb";
}

export const FileSelectArea = ({ type, text, maxSize }: FileAreaInput) => {
	const storage = window.localStorage;
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

		const lastFileName = storage.getItem(`${type}file`);
		if (newFile.name === lastFileName) {
			return;
		}
		//set last file name to this one now
		storage.setItem(`${type}file`, newFile.name);

		const response = await uploadSingle({
			variables: {
				file: newFile,
				type: type,
			},
			// update: (store, { data }) => {
			// 	if (!data || !refetch) {
			// 		return null;
			// 	}

			// 	//remember, the filename is: <payload.id>.webp
			// 	const saveName = data.singleUpload.filename;
			// 	const userID = saveName.split('.')[0];

			// 	store.writeQuery<MyNameAndPfpQuery>({
			// 		query: MyNameAndPfpDocument,
			// 		data: {
			// 			myAccount: {
			// 				_id: userID,
			// 				account: {
			// 					username: data.updateProfile.account.username,
			// 					tag: data.updateProfile.account.tag,
			// 				},
			// 				profile: {
			// 					pictureUrl: data.updateProfile.profile.pictureUrl,
			// 				},
			// 			},
			// 		},
			// 	});
			// }
		});

		if (response && response.data) {
			console.log("successful upload");
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
						setError("Over the 2mb upload limit");
					}
				}}
			/>
			<div className={uploadStyles.content}>
				{/* handles compensating for the uncentered icon + sign pushes it left) */}
				<div className={uploadStyles.imageOffsetWrapper}>
					<img src="resources/uploadAreaIcon.svg" className={isError ? uploadStyles.errorIcon : uploadStyles.icon} />
				</div>
				{showText ? <p className={isError ? uploadStyles.error : uploadStyles.subtitle}>{text}</p> : null}
			</div>
		</button>
	);
};
