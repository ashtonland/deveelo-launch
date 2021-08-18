import formStyles from "../styles/form.module.css";
import headerStyles from "../styles/headers.module.css";

function login() {
	return (
		<div className={formStyles.largeContainerOffset}>
			<p className={headerStyles.aboveHeader}>Hello,</p>
			<h1 className={headerStyles.headerLarge}>Welcome to Deveelo</h1>
		</div>
	);
}

export default login;
