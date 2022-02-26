import React from "react";

interface IB_Props {
	src: string;
	//top-bottom & left-right padding
	width: string;
	height: string;
	paddingTB?: number;
	paddingLR?: number;
	preset?: string;
}

const IconButton = ({ src, width, height, paddingTB, paddingLR, preset }: IB_Props) => {
	const tb = paddingTB ? paddingTB : 0;
	const lr = paddingLR ? paddingLR : 0;

	const buttonStyle = () => ({
		width: width,
		height: height,
		padding: `${tb}em ${lr}em`,
	});

	return (
		<button className="simpleButton">
			<img style={buttonStyle()} src={src}></img>
		</button>
	);
};

export default IconButton;
