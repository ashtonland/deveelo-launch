import { useRouter } from "next/router";
import subnavStyles from "../../styles/minor/subnav.module.css";

interface SNB_Props {
	key: string;
	src: string;
	path: string;
	color: string; //when active
}

const SubnavButton = ({ key, src, path, color }: SNB_Props) => {
	const router = useRouter();

	//use color for this button if its click path matches the current (we are on its page)
	const validUrls = ["/", "/devlogs", "/groups", "/home"];
	//check if the current route starts the same as this button' link to path; also
	//check if the first /blahblah in the current route is in the valid site pages urls array
	const active = router.pathname.substring(0, 4) === path.substring(0, 4) && validUrls.includes(router.pathname.substring(0, path.length));

	const iconStyle = () => ({
		width: "100%",
		height: "100%",
	});

	return (
		<button style={{ background: active ? color : "#D7E0EF" }} className={subnavStyles.button} onClick={() => router.push(`${path}`)}>
			<img style={iconStyle()} src={src} />
		</button>
	);
};

export default SubnavButton;
