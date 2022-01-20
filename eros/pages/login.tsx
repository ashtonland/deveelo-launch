import { useRouter } from "next/router";
import formStyles from "../styles/form.module.css";
import headerStyles from "../styles/headers.module.css";

import Form from "../components/minor/Form";
import { getAccessToken } from "../accessToken";

function login() {
	const accessToken = getAccessToken();
	const router = useRouter();
	if (accessToken && accessToken !== "") {
		router.push("/");
	}

	return (
		<div className={formStyles.largeContainerOffset}>
			<p className={headerStyles.aboveHeader}>Hello,</p>
			<h1 className={headerStyles.headerLarge}>Welcome back</h1>
			<Form type="login" />
		</div>
	);
}

export default login;
