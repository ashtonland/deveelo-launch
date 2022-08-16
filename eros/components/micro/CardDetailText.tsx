import cardStyles from "../../styles/micro/widgetcards.module.css";

interface DetailProps {
	text: string;
	boldtext?: string;
	larger?: boolean;
}

const CardDetailText = ({ text, boldtext, larger }: DetailProps) => {
	return (
		<p className={larger ? cardStyles.detailLarge : cardStyles.detail}>
			{text} {boldtext ? <span style={{ fontWeight: 700, marginLeft: ".25em" }}>{boldtext}</span> : null}
		</p>
	);
};

export default CardDetailText;
