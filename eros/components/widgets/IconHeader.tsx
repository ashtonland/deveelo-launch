import iconheaderStyles from "../../styles/micro/iconheader.module.css";

interface IconHeaderProps {
	type: "widget";
	src: string;
	color: "purple" | "pink-yellow" | "gold" | "red" | "pinky-red" | "blue" | "green";
	text: string;
}

const purple = { background: "linear-gradient(120.25deg, #7594FF 11.25%, #685CEF 88.64%)", boxShadow: "0px 0.375em 0.938em rgba(104, 92, 239, 0.3)" };

const IconHeader = ({ type, src, color, text }: IconHeaderProps) => {
	// map type to header text styling
	const textStyles = new Map<string, any>();
	textStyles.set("widget", iconheaderStyles.widget);
	//map input to icon color
	const iconColors = new Map<string, any>();
	iconColors.set("purple", purple);

	return (
		<div className={iconheaderStyles.container}>
			<img style={iconColors.get(color)} className={iconheaderStyles.icon} src={src} />
			<h5 className={textStyles.get(type)}>{text}</h5>
		</div>
	);
};

export default IconHeader;
