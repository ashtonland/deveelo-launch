import router from "next/router";
import React, { useState } from "react";
import buttonStyles from "../../styles/micro/iconbutton.module.css";

interface IB_Props {
	src: string;
	activesrc?: string;
	//top-bottom & left-right padding
	width: string;
	height: string;
	paddingTB?: number;
	paddingLR?: number;
	action?: {
		activeAction: any;
		inactiveAction: any;
		options?: {
			toggleActive?: boolean;
			dangerous?: boolean;
		};
	};
	startActive?: boolean;
	submit?: boolean;
	disabled?: boolean;
}

const IconButton = ({ src, activesrc, width, height, paddingTB, paddingLR, action, startActive, submit, disabled }: IB_Props) => {
	const tb = paddingTB ? paddingTB : 0;
	const lr = paddingLR ? paddingLR : 0;

	const buttonStyle = () => ({
		width: width,
		height: height,
		padding: `${tb}em ${lr}em`,
	});

	// we are not logged in
	if (disabled) {
		return (
			<button className={buttonStyles.simpleButton}>
				<img style={buttonStyle()} src={src} />
			</button>
		);
	}

	const [active, setActive] = useState(startActive);
	let useRed: boolean;

	if (action) {
		if (action.options) {
			if (action.options.dangerous !== undefined) {
				useRed = action.options.dangerous;
			}
		}
	}

	const currentAction = active ? action?.activeAction : action?.inactiveAction;

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

	return (
		<button className={useRed && active ? buttonStyles.simpleWarn : buttonStyles.simpleButton} type={submit ? "submit" : undefined} onClick={() => handlePress()}>
			<img style={buttonStyle()} className={useRed && active ? buttonStyles.warnColor : undefined} src={active ? activesrc : src} />
		</button>
	);
};

export default IconButton;
