import activityStyles from "../styles/activitybar.module.css";

interface activityBarParams {
	widgetKeys?: string;
	hardEdge?: boolean;
}

const ActivityBar = ({ widgetKeys, hardEdge }: activityBarParams) => {
	return <div className={hardEdge ? activityStyles.activityBar_full : activityStyles.activityBar}></div>;
};

export default ActivityBar;
