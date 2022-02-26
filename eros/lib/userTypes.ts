//the user data publicly availiable through server routes, no sensitive data
export interface PublicUserType {
	account: {
		tag: string;
		username: string;
		createdAt: string;
		lastOnline: string;
		private: boolean;
	};
	status: "online" | "idle" | "dnd" | "offline";
}

export interface SearchUserType {
	account: {
		tag: string;
		username: string;
		createdAt: string;
		lastOnline: string;
		private: boolean;
	};
	profile: {
		pictureUrl: string;
		badges: string[];
	};
	status: "online" | "idle" | "dnd" | "offline";
}
