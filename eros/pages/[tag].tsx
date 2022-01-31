import React from "react";
import { useRouter } from "next/router";
import { setSideBarByTag } from "../hooks/setSidebar";

const ProfilePage = () => {
	const router = useRouter();
	const { tag } = router.query;

	setSideBarByTag(tag as string);

	return null;
};

export default ProfilePage;
