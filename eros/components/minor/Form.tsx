import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import formStyles from "../../styles/form.module.css";
import TextButton from "../micro/TextButton";
import { useLoginMutation, useRegisterMutation } from "../../hooks/backend/generated/graphql";
import { setAccessToken } from "../../accessToken";

const Form = ({ type }: { type: string }) => {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login] = useLoginMutation();
	const [register] = useRegisterMutation();
	const [show, setShow] = useState(false);

	//Error states
	const [emailErr, setEmailErr] = useState("");
	const [passErr, setPassErr] = useState("");

	const toggleClass = () => {
		setShow(!show);
	};

	const handleSubmitErrors = (errors: any) => {
		setEmailErr("");
		setPassErr("");

		for (var prop in errors) {
			if (Object.prototype.hasOwnProperty.call(errors, prop)) {
				//i.e prop=email, value=field required

				if (prop === "email" || prop === "username") {
					if (errors[prop] !== "" || errors[prop] !== null) {
						setEmailErr(errors[prop]);
						break;
					}
				} else if (prop === "password") {
					if (errors[prop] !== "" || errors[prop] !== null) {
						setPassErr(errors[prop]);
						break;
					}
				}
			}
		}
	};

	return (
		<form
			className={formStyles.largeContainer}
			onSubmit={async (e) => {
				e.preventDefault();

				if (type === "register") {
					try {
						const response = await register({
							variables: {
								registerEmail: email,
								registerPassword: password,
							},
						});

						if (response && response.data) {
							setAccessToken(response.data.register.accessToken);
							router.push("/");
						}
					} catch (error) {
						if (error.graphQLErrors[0].extensions.errors) {
							//errors with user input reported in backend check
							const inputErrs = error.graphQLErrors[0].extensions.errors;
							handleSubmitErrors(inputErrs);
						}
					}
				} else {
					try {
						const response = await login({
							variables: {
								loginInput: email,
								loginPassword: password,
							},
						});

						if (response && response.data) {
							setAccessToken(response.data.login.accessToken);
							router.push("/");
						}
					} catch (error) {
						if (error.graphQLErrors[0].extensions.errors) {
							//errors with user input reported in backend check
							const inputErrs = error.graphQLErrors[0].extensions.errors;
							handleSubmitErrors(inputErrs);
							//console.log(inputErrs);
						}
					}
				}
			}}>
			<div className={formStyles.field}>
				<input
					className={formStyles.input}
					value={email}
					type={type == "register" ? "email" : "text"}
					name={type == "register" ? "email" : "emailorname"}
					placeholder=" "
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<label htmlFor="emailorname" className={formStyles.label}>
					{type == "register" ? "Enter email" : "Enter email or username"}
				</label>
				<p className={formStyles.error}>{emailErr}</p>
			</div>

			<div className={formStyles.field}>
				<input
					className={formStyles.input}
					value={password}
					type={show ? "text" : "password"}
					name="password"
					placeholder=" "
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<label htmlFor="password" className={formStyles.label}>
					Enter password
				</label>
				<p className={formStyles.error}>{passErr}</p>

				<span className={show ? formStyles.togglePassword : formStyles.toggledPassword} onMouseDown={() => toggleClass()}>
					<Image src={show ? "/resources/eyeHide.svg" : "/resources/eye.svg"} width="22.5" height="22.5" />
				</span>
			</div>
			<div className={formStyles.submitWrapper}>
				<TextButton colorKey="gold" text={type == "register" ? "Register" : "Login"} submit={true} />
			</div>
		</form>
	);
};

export default Form;
