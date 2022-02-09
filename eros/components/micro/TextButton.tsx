import { useRouter } from "next/router";
import buttonStyles from "../../styles/textbutton.module.css";

interface buttonParams {
	colorKey?: string;
	text: string;
	submit?: boolean;
	action?: any;
	disabled?: boolean;
}

const TextButton = ({ colorKey, text, submit, action, disabled }: buttonParams) => {
	const router = useRouter();
	let content: any = null;

	const handlePress = () => {
		if (action && !submit) {
			router.push(action);
		}
	};

	switch (colorKey) {
		case "gold":
			content = (
				<button className={buttonStyles.goldGrad} type={submit ? "submit" : undefined} onClick={(e) => handlePress()}>
					{text}
				</button>
			);
			break;
		case "green":
			content = (
				<button className={buttonStyles.greenGrad} type={submit ? "submit" : undefined} onClick={(e) => handlePress()}>
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
