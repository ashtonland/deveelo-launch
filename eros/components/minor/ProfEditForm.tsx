import { useState } from "react";

import formStyles from "../../styles/form.module.css";
import sidebarStyles from "../../styles/sidebar.module.css";
import TextButton from "../micro/TextButton";
import { useUpdateProfileMutation, MyNameAndPfpDocument, MyNameAndPfpQuery, MyAccountMinProfileQuery, MyAccountMinProfileDocument } from "../../hooks/backend/generated/graphql";
import { updateSidebar } from "../../hooks/socialhooks";

interface UserFormPresets {
	name: string;
	tag: string;
	description: string;
}

const ProfileEditForm = ({ name, tag, description }: UserFormPresets) => {
	//user input captures
	const [newName, setNewName] = useState(name);
	const [newTag, setNewTag] = useState(tag);
	const [newDescription, setNewDescription] = useState(description);

	//api
	const [UpdateProfile] = useUpdateProfileMutation({ refetchQueries: [{ query: MyAccountMinProfileDocument }] });

	return (
		<form
			className={formStyles.pFormContainer}
			onSubmit={async (e) => {
				e.preventDefault();

				try {
					const response = await UpdateProfile({
						variables: {
							newname: newName,
							newtag: newTag,
							newdes: newDescription,
						},
						update: (store, { data }) => {
							if (!data) {
								return null;
							}
							//update cache for name&pfp query
							//aka update navbar
							store.writeQuery<MyNameAndPfpQuery>({
								query: MyNameAndPfpDocument,
								data: {
									myAccount: {
										_id: data.updateProfile._id,
										account: {
											username: data.updateProfile.account.username,
											tag: data.updateProfile.account.tag,
										},
										profile: {
											pictureUrl: data.updateProfile.profile.pictureUrl,
										},
									},
								},
							});
							//update cache for minprofile query (update sidebar)
							store.writeQuery<MyAccountMinProfileQuery>({
								query: MyAccountMinProfileDocument,
								data: {
									myAccount: data.updateProfile,
								},
							});
						},
					});

					if (response && response.data) {
						updateSidebar("edittoggle");

						//reload so the info updates after the 1st change since reload (the
						//1st time is covered by writing to the cache)
						const finalTag = response.data.updateProfile.account.tag;
						//window.location.assign(`/${finalTag}`);
					}
				} catch (error) {
					if (error.graphQLErrors[0].extensions.errors) {
						//errors with user input reported in backend check
						const inputErrs = error.graphQLErrors[0].extensions.errors;
						console.log(inputErrs);

						//handleSubmitErrors(inputErrs);
					}
				}
			}}>
			<div className={formStyles.fieldThin}>
				<input
					className={formStyles.input}
					value={newName}
					type="text"
					name="editname"
					placeholder=" "
					onChange={(e) => {
						setNewName(e.target.value);
					}}
				/>
				<label htmlFor="editname" className={formStyles.label}>
					Username
				</label>
				{/* <p className={formStyles.error}>{emailErr}</p> */}
			</div>
			<div className={formStyles.fieldThin}>
				<input
					className={formStyles.input}
					value={newTag}
					type="text"
					name="edittag"
					placeholder=" "
					onChange={(e) => {
						setNewTag(e.target.value);
					}}
				/>
				<label htmlFor="edittag" className={formStyles.label}>
					@ handle
				</label>
				{/* <p className={formStyles.error}>{emailErr}</p> */}
			</div>
			<div className={formStyles.fieldArea}>
				<textarea
					className={formStyles.inputarea}
					value={newDescription}
					name="editdes"
					placeholder=" "
					onChange={(e) => {
						setNewDescription(e.target.value);
					}}
				/>
				<label htmlFor="editdes" className={formStyles.label}>
					Description
				</label>
				{/* <p className={formStyles.error}>{emailErr}</p> */}
			</div>
			<div className={sidebarStyles.buttonContainer}>
				<TextButton colorKey="green" text="Update" submit={true} large={false} />
				<TextButton colorKey="red" text="Cancel" submit={false} large={false} action={() => updateSidebar("edittoggle")} />
			</div>
		</form>
	);
};

export default ProfileEditForm;
