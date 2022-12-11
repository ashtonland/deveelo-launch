import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useUploadSingleMutation } from "../../hooks/backend/generated/graphql";
import { checkFileSize } from "../../hooks/inputUtils";
import buttonStyles from "../../styles/micro/icontextbutton.module.css";

interface ITB_Props {
	src: string;
	text: string;
	activesrc?: string;
	failsrc?: string;
	//top-bottom & left-right padding
	width: string;
	//should this be a defined-width gold grad major button (i.e. post button)
	gold?: boolean;
	green?: boolean;
	action?: {
		activeAction: any;
		inactiveAction: any;
		options?: {
			toggleActive?: boolean;
			controlActive?: boolean;
		};
	};
	startActive?: boolean;
	forcedActive?: boolean; //for controlled active
	submit?: boolean;
	disabled?: boolean;
	type?: string; //necessary for the upload button, not used by regular button
	startUpload?: boolean; //sends the gql request and uploads the post, only for upload button
	onFailedUpload?: any; //used to reset starter prop if no file was selected but post attempt was attempted & failed
	onSuccess?: any; //used to set state in parent which will unmount this and load post preview
}

export const IconTextButton = ({ src, text, activesrc, failsrc, gold, green, width, action, startActive, forcedActive, submit, disabled }: ITB_Props) => {
	const router = useRouter();

	const buttonStyle = () => ({
		width: width,
		height: width,
	});

	//create the different border types and set the default, which can
	//be overriden later after testing for error or success.
	const successStyle = () => ({ borderColor: `var(--online)` });
	const errorStyle = () => ({ borderColor: `var(--dnd)` });
	const normStyle = () => ({ borderColor: `#BBC8DB` });

	const regularStyle = buttonStyles.inactive;

	// we are not logged in
	if (disabled) {
		return (
			<button className={regularStyle}>
				<img style={buttonStyle()} src={src} />
			</button>
		);
	}

	const [active, setActive] = useState(startActive);

	const shouldOverride = action?.options?.controlActive;
	const useActive = shouldOverride ? forcedActive : active;

	const borderStyle = useActive ? successStyle : normStyle;

	const currentAction = useActive ? action?.activeAction : action?.inactiveAction;

	const handlePress = () => {
		//if the type is submit, it already has a form specific action
		if (action !== null && action !== undefined && !submit) {
			//get the type of the input, and decide what to do with it
			const type = typeof currentAction;
			if (type === "string") {
				//string actions are assumed to be path to another page
				router.push(currentAction);
			} else {
				//we assume it is a function, so run it
				currentAction();
				if (!action.options) return;
				if (!action.options.toggleActive) return;

				setActive(!active);
			}
		}
	};

	const icon = active ? activesrc : src;
	//override the icon to success or error ones here
	//override the borderstyle

	//gold or green button?
	const colored = gold || green;

	return (
		<button
			style={colored ? null : borderStyle()}
			className={colored ? (gold ? buttonStyles.gold : buttonStyles.green) : regularStyle}
			type={submit ? "submit" : undefined}
			onClick={(e) => {
				e.preventDefault();
				handlePress();
			}}>
			<img style={buttonStyle()} src={icon} />
			<p className={buttonStyles.text}>{text}</p>
		</button>
	);
};

//same system but w/ file upload capabilities
export const UploadIconTextButton = ({ src, type, startUpload, onSuccess, onFailedUpload, text, activesrc, failsrc, gold, width, submit, disabled }: ITB_Props) => {
	// UPLOAD STUFF
	const [newFile, setNewFile] = useState<File>();
	const [error, setError] = useState("");
	const isError = error !== "";
	//turn button green if user selected a valid file
	const active = newFile && !isError;

	const [uploadSingle] = useUploadSingleMutation();

	const fileInput = useRef<HTMLInputElement>();

	const selectFile = () => {
		if (fileInput && fileInput.current) {
			fileInput.current.click();
		}
	};

	const handleNewUpload = async () => {
		const storage = localStorage;
		if (storage.getItem("uploading") !== null) {
			//this is a duplicate request, we are already processing an upload
			return;
		}
		if (!newFile || isError) {
			//reset posted in parent to false where it can be reused to trigger
			//otherwise, upload will attempt w/ every component rerender...which
			//happens to be w/ every letter entered into the textbox :|
			onFailedUpload();
			return;
		}

		storage.setItem("uploading", "true");

		const hashtags: string[] = [];

		const response = await uploadSingle({
			variables: {
				file: newFile,
				type: type,
				edata: {
					field1: storage.getItem("postbody"), //body
					field2: hashtags, //hashtags
					field3: null,
				},
			},
		});

		if (response && response.data) {
			//remove the body from localstore, we used it already and storage is
			//becoming cluttered tbh
			storage.removeItem("postbody");
			storage.removeItem("uploading");
			//successfully created post, switch to share screen.
			//also pass the name (and therefore the file path) that
			//the image was saved at for the share preview
			const info = response.data.singleUpload;

			//the preview link
			const imageLink = info.doc.text2;
			onSuccess(imageLink);
		}
	};

	if (startUpload) {
		handleNewUpload();
	}

	//REGULAR STUFF
	const buttonStyle = () => ({
		width: width,
		height: width,
	});

	//create the different border types and set the default, which can
	//be overriden later after testing for error or success.
	const successStyle = () => ({ borderColor: `var(--online)` });
	const errorStyle = () => ({ borderColor: `var(--dnd)` });
	const normStyle = () => ({ borderColor: `#BBC8DB` });

	const regularStyle = buttonStyles.inactive;

	// we are not logged in
	if (disabled) {
		return (
			<button className={regularStyle}>
				<img style={buttonStyle()} src={src} />
			</button>
		);
	}

	let borderStyle = active ? successStyle : normStyle;

	//state overrides before rendering
	let icon = active ? activesrc : src;
	const content = active ? newFile.name : text;

	if (isError) {
		icon = failsrc;
		borderStyle = errorStyle;
	}

	return (
		<button style={borderStyle()} className={gold ? buttonStyles.gold : regularStyle} type={submit ? "submit" : "button"} onClick={selectFile} onSubmit={handleNewUpload}>
			<input
				type="file"
				id={`${type}file`}
				style={{ display: "none" }}
				ref={fileInput}
				accept="image/png, image/jpeg, image/jfif, image/webp, image/avif, video/mp4, video/quicktime"
				onChange={(e) => {
					const file = e.target.files[0];
					const maxSize = "15mb";

					const pass = checkFileSize(file.size, maxSize);
					if (pass) {
						setNewFile(file);
						setError("");
					} else {
						setError(`Over the ${maxSize} limit`);
					}
				}}
			/>
			<img style={buttonStyle()} src={icon} />
			<p className={buttonStyles.text}>{isError ? error : content}</p>
		</button>
	);
};
