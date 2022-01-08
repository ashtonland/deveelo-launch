import buttonStyles from "../../styles/textbutton.module.css";

interface buttonParams {
	colorKey?: string;
	text: string;
	action?: any;
	disabled?: boolean;
}

const TextButton = ({ colorKey, text, action, disabled }: buttonParams) => {
	let content: any = null;

	switch (colorKey) {
		case "gold":
			content = <button className={buttonStyles.goldGrad}>{text}</button>;
			break;
		case "green":
			content = <button className={buttonStyles.greenGrad}>{text}</button>;
			break;
		default:
			content = (
				<button className={buttonStyles.goldGrad}>
					<p className={buttonStyles.b_text}>{text}</p>
				</button>
			);
			break;
	}

	return content;
};

export default TextButton;
