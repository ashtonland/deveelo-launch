import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import styles from "../styles/posts/feed.module.css";

interface MB_Props {
	children: any;
	padded: boolean;
}

const MiddleBar = ({ children, padded }: MB_Props) => {
	return <SimpleBar className={padded ? styles.scrollviewpadded : styles.scrollview}>{children}</SimpleBar>;
};

export default MiddleBar;
