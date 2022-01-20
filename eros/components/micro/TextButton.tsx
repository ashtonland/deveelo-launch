import buttonStyles from "../../styles/textbutton.module.css";

interface buttonParams {
	colorKey?: string;
	text: string;
	submit?: boolean;
	action?: any;
	disabled?: boolean;
}

const TextButton = ({ colorKey, text, submit, action, disabled }: buttonParams) => {
	let content: any = null;

	switch (colorKey) {
		case "gold":
			content = (
				<button className={buttonStyles.goldGrad} type={submit ? "submit" : undefined}>
					{text}
				</button>
			);
			break;
		case "green":
			content = (
				<button className={buttonStyles.greenGrad} type={submit ? "submit" : undefined}>
					{text}
				</button>
			);
			break;
		default:
			content = (
				<button className={buttonStyles.goldGrad} type={submit ? "submit" : undefined}>
					{text}
				</button>
			);
			break;
	}

	return content;
};

export default TextButton;
