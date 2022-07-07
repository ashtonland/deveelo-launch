import { useRouter } from "next/router";
import buttonStyles from "../../styles/textbutton.module.css";

interface buttonParams {
	colorKey?: string;
	text: string;
	submit?: boolean;
	action?: any;
	disabled?: boolean;
	large?: boolean;
}

const TextButton = ({ colorKey, text, submit, action, disabled, large }: buttonParams) => {
	const router = useRouter();
	let content: any = null;

	//perform the action entered to the action field of this component
	const handlePress = () => {
		//if the type is submit, it already has a form specific action
		if (action !== null && action !== undefined && !submit) {
			//get the type of the input, and decide what to do with it
			const type = typeof action;
			if (type === "string") {
				//string actions are assumed to be path to another page
				router.push(action);
			} else {
				//we assume it is a function, so run it
				action();
			}
		}
	};

	switch (colorKey) {
		case "gold":
			if (large) {
				//used for login/form submit buttons
				content = (
					<button className={buttonStyles.goldGradL} type={submit ? "submit" : undefined} onClick={(e) => handlePress()}>
						{text}
					</button>
				);
			} else {
				//follow button has smaller text
				content = (
					<button className={buttonStyles.goldGrad} type={submit ? "submit" : undefined} onClick={(e) => handlePress()}>
						{text}
					</button>
				);
			}
			break;
		case "green":
			content = (
				<button className={buttonStyles.greenGrad} type={submit ? "submit" : undefined} onClick={(e) => handlePress()}>
					{text}
				</button>
			);
			break;
		case "red":
			content = (
				<button className={buttonStyles.redGrad} type={submit ? "submit" : undefined} onClick={(e) => handlePress()}>
					{text}
				</button>
			);
			break;
		default:
			content = (
				<button className={buttonStyles.goldGrad} type={submit ? "submit" : undefined} onClick={(e) => handlePress()}>
					{text}
				</button>
			);
			break;
	}

	return content;
};

export default TextButton;
