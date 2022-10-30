import dynamic from "next/dynamic";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import { EmojiStyle, Theme, Categories, EmojiClickData, SuggestionMode } from "emoji-picker-react";
import emojiStyles from "../../styles/micro/emoji.module.css";

import postStyles from "../../styles/posts/postarea.module.css";
import ProfilePicture from "../micro/ProfilePicture";

import { useMyPfpAndStatusQuery } from "../../hooks/backend/generated/graphql";
import { isLoggedIn } from "../../hooks/userChecks";
import IconButton from "../micro/IconButton";
import { useEffect, useRef, useState } from "react";
import { IconTextButton, UploadIconTextButton } from "../micro/IconTextButton";

const PostArea = () => {
	//STATE MANAGEMENT
	const [showEmoji, setShowEmoji] = useState(false);
	const [caretPos, setCaretPos] = useState(0);
	const [postText, setPostText] = useState("");
	localStorage.setItem("postbody", postText);

	const textInput = useRef<HTMLTextAreaElement>();
	/* states for loading the share & preview area */
	const [previewFile, setPreviewFile] = useState<string>(); //the img file name

	//EVERYTHING ELSE
	//automatically expand the size of the text area upon new lines
	//instead of wrapping & hiding old lines
	useEffect(() => {
		//fetch the text area by id
		const textarea = document.querySelector("#postarea");
		textarea?.addEventListener("input", autoResize, false);

		function autoResize() {
			this.style.height = "auto";
			this.style.height = this.scrollHeight - 5 + "px";
		}

		return () => {
			//remove the event lisner on unmound
			const textarea = document.querySelector("#postarea");
			textarea?.removeEventListener("input", autoResize, false);
		};
	}, [postText]);

	//handle swtiching to share screen when recieving successful post event
	useEffect(() => {
		const handleUpdate = (e: CustomEvent) => {
			//detail is packed with: type|serverfilename (see socialHooks.ts)
			//i.e. afterpost|fue745gfaiu.webp
			const decoded = JSON.parse(e.detail);
			console.log(decoded);

			const type = decoded.type;
			const filename = decoded.imageName;
			const body = decoded.document.body;

			if (type === "afterpost") {
				// User successfully launched a post, remove form and replace it
				// with a preview & share options
				setPreviewFile(filename);
			}
		};
		setTimeout(() => {
			//add event listener to the postarea which listens for
			//events telling to swap the create post form out for a
			//post preview alongside a couple share buttons
			//the source of these dispatched events are socialhoots.ts
			const postarea = document.getElementById("postarea");

			if (postarea) {
				postarea.addEventListener("updatePostArea", handleUpdate);
			}
		}, 1000);

		return () => {
			//remove listener on unmount
			const postarea = document.getElementById("postarea");

			if (postarea) {
				postarea.removeEventListener("updatePostArea", handleUpdate);
			}
		};
	}, []);

	useEffect(() => {
		if (showEmoji) {
			setTimeout(() => {
				const postarea = document.getElementById("postarea");
				if (postarea === undefined) return;

				const offsets = postarea.getBoundingClientRect();
				const wrapper = document.getElementById("pickerwrapper");
				if (wrapper === undefined) return;
				//postarea.style.letterSpacing = ".02em"

				const pickers = document.getElementsByClassName("EmojiPickerReact epr-main");
				if (pickers === undefined) return;

				wrapper.style.top = offsets.y + "px";
				wrapper.style.left = postarea.offsetWidth + 100 + "px";

				const picker = pickers[0] as HTMLElement;
				picker.style.setProperty("--epr-emoji-size", "1.2em");
				picker.style.setProperty("--epr-category-label-height", "2em");
				picker.style.setProperty("--epr-emoji-padding", ".7em");
				picker.style.setProperty("--epr-category-icon-active-color", "#fff");
				picker.style.setProperty("--epr-search-input-bg-color", "var(--searchGray)");
				picker.style.setProperty("--epr-search-input-height", "2.5em");
				picker.style.setProperty("--epr-search-input-placeholder-color", "var(--midFadeGray)");
				picker.style.setProperty("--epr-search-input-text-color", "var(--textNormalCol)");
				picker.style.setProperty("--epr-search-input-padding", "0 2.5em");
				picker.style.setProperty("--epr-header-padding", ".7em .7em");
				picker.style.setProperty("--epr-category-navigation-button-size", "1.2em");
				picker.style.setProperty("--epr-text-color", "var(--midFadeGray)");
				picker.style.setProperty("--epr-category-label-padding", "0em 1.6em");
				picker.style.setProperty("--epr-picker-border-color", "#fff");
				picker.style.setProperty("--epr-hover-bg-color", "#ffb12914");
				picker.style.setProperty("--epr-focus-bg-color", "#ffb1292a");
				picker.style.setProperty("--epr-highlight-color", "var(--idle)");
				picker.style.setProperty("--epr-search-input-border-radius", "1em");
				picker.style.setProperty("--epr-picker-border-radius", "1em");
				picker.style.setProperty("--epr-horizontal-padding", ".625em");
				picker.style.boxShadow = "0px 0px 1.875em rgba(30, 50, 90, 0.05)";

				// SETTING CATEGORY FONTS (we have to do them individually)
				const labels = document.getElementsByClassName("epr-emoji-category-label");

				for (let i = 0; i < labels.length; i++) {
					const element = labels[i] as HTMLElement;

					element.style.fontFamily = "DM Sans";
					element.style.fontWeight = "400";
					element.style.letterSpacing = ".02em";
				}

				// EMOJI SEARCHBAR
				const searches = document.getElementsByClassName("epr-search");
				for (let i = 0; i < searches.length; i++) {
					const element = searches[i] as HTMLElement;

					element.style.fontFamily = "DM Sans";
					element.style.fontWeight = "400";
				}

				// SEARCHBAR ICON
				const searchIcons = document.getElementsByClassName("epr-icn-search");
				for (let i = 0; i < searchIcons.length; i++) {
					const element = searchIcons[i] as HTMLElement;

					element.style.backgroundSize = "1.5em";
					element.style.height = "1.5em";
					element.style.width = "1.5em";
					element.style.backgroundImage = "url(/resources/mag.svg)";
				}
			}, 0);
		}
	}, [showEmoji]);

	// EMOJI SELECTION
	function onClick(emojiData: EmojiClickData, event: MouseEvent) {
		// setInsertEmoji(emojiData.emoji);
		console.log(emojiData.emoji);
		if (textInput && textInput.current) {
			//allows you to keep typing seemlessly
			textInput.current.focus();
			//store the unaltered text & split at cursor
			const text = textInput.current.value;
			const original = [text.substring(0, caretPos), text.substring(caretPos, text.length)];

			//insert our emoji at the cursor
			const withEmoji = original[0] + emojiData.emoji + original[1];
			textInput.current.value = withEmoji;
			//sync the visible change w/ the variable copy used in code
			//also rerenders!
			setPostText(withEmoji);
		}
	}

	const { data, loading, error } = useMyPfpAndStatusQuery();
	const loggedIn = isLoggedIn();

	if ((loading && !data) || !loggedIn || !data.myAccount) {
		return <div></div>;
	}
	if (error) {
		console.log("error is: " + error);
		return <div>Error occured</div>;
	}

	const user = data.myAccount;
	if (!user) {
		console.log("user pfp not retrieved for post area");

		return <div></div>;
	}

	const selectInput = () => {
		if (textInput && textInput.current) {
			textInput.current.focus();
		}
	};

	return (
		<div id="postarea" className={postStyles.container}>
			{/* container swaps out the following: */}
			<div className={postStyles.wrapper}>
				<ProfilePicture size="w32" source={user.profile.pictureUrl} status={user.status} />
				<form className={postStyles.form} onSubmit={() => console.log("submitted")}>
					<div className={postStyles.textbox} onClick={selectInput}>
						<textarea
							name="post"
							id="postarea"
							className={postStyles.input}
							ref={textInput}
							placeholder="What have you been working on?"
							onClick={(e) => {
								e.preventDefault();
								console.log(e.currentTarget.selectionStart);
								setCaretPos(e.currentTarget.selectionStart);
							}}
							onChange={(e) => {
								setPostText(e.target.value);
								console.log(e.currentTarget.selectionStart);
								setCaretPos(e.currentTarget.selectionStart);
							}}
						/>
						{/* EMOJI BUTTON AND PICKER */}
						<div className={emojiStyles.picker}>
							<IconButton
								src="/resources/post_emoji.svg"
								activesrc="/resources/post_emoji_on.svg"
								width="1.3em"
								height="1.3em"
								paddingLR={0}
								paddingTB={0}
								hoverFxOff={true}
								prevent={true}
								action={{
									activeAction: () => setShowEmoji(false),
									inactiveAction: () => setShowEmoji(true),
									options: {
										toggleActive: true,
									},
								}}
							/>
						</div>
					</div>
					{showEmoji ? (
						<div id="pickerwrapper" className={emojiStyles.pickerWrapper}>
							<EmojiPicker
								onEmojiClick={onClick}
								autoFocusSearch={false}
								theme={Theme.LIGHT}
								height="25em"
								width="30em"
								lazyLoadEmojis={true}
								previewConfig={{
									showPreview: false,
								}}
								suggestedEmojisMode={SuggestionMode.FREQUENT}
								skinTonesDisabled={false}
								searchPlaceHolder="Search for emojis"
								emojiStyle={EmojiStyle.NATIVE}
								categories={[
									{
										name: "Frequent",
										category: Categories.SUGGESTED,
									},
									{
										name: "Smiles & People",
										category: Categories.SMILEYS_PEOPLE,
									},
									{
										name: "Animals",
										category: Categories.ANIMALS_NATURE,
									},
									{
										name: "Food & Drinks",
										category: Categories.FOOD_DRINK,
									},
									{
										name: "Fun and Games",
										category: Categories.ACTIVITIES,
									},
									{
										name: "Objects & Celebrations",
										category: Categories.OBJECTS,
									},
									{
										name: "Travel",
										category: Categories.TRAVEL_PLACES,
									},
									{
										name: "Flags",
										category: Categories.FLAGS,
									},
									{
										name: "Symbols",
										category: Categories.SYMBOLS,
									},
								]}
							/>
						</div>
					) : null}
					<div className={postStyles.buttonWrapper}>
						<UploadIconTextButton
							text="Photo / Video"
							src="/resources/ITB/add.svg"
							activesrc="/resources/ITB/success.svg"
							failsrc="/resources/ITB/fail.svg"
							width="1rem"
							type="post"
							action={{
								activeAction: () => console.log("trigger upload"),
								inactiveAction: () => console.log("trigger reupload"),
								options: { toggleActive: true },
							}}
						/>
						<IconTextButton submit={true} text="Post" src="/resources/ITB/pencil.svg" gold={true} width="0.9375em" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default PostArea;
