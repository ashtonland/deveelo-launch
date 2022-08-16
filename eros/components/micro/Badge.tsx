import nameStyles from "../../styles/namegroup.module.css";

const Badge = ({ keys, outline, size }: { keys?: string[]; outline?: boolean; size: number }) => {
	let items: any = [];

	//sizes that should use the small badge
	const smallSizes = [5, 6];
	const useSmall = () => smallSizes.includes(size);

	const outlineStyle = useSmall ? nameStyles.smallBadge : nameStyles.colorlesslargeBadge;

	for (let i = 0; i < keys.length; i++) {
		if (keys[i] == "verified") {
			items.push(
				<div key="0" className={outline ? outlineStyle : nameStyles.v_largeBadge}>
					<div className={outline ? nameStyles.checkmarkout : nameStyles.checkmark} />
				</div>
			);
		} else if (keys[i] == "staff") {
			items.push(
				<div key="1" className={outline ? outlineStyle : nameStyles.s_largeBadge}>
					<div className={outline ? nameStyles.shieldout : nameStyles.shield} />
				</div>
			);
		}
	}

	return <>{items}</>;
};

export default Badge;
