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

export interface SearchUserIdType {
	_id: string;
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

// only the fields that are used
export interface SearchPureType {
	account: {
		tag: string;
		username: string;
	};
	profile: {
		pictureUrl: string;
		badges: string[];
	};
	status: "online" | "idle" | "dnd" | "offline";
}

export interface SearchAccountType {
	tag: string;
	username: string;
	createdAt: string;
	lastOnline: string;
	private: boolean;
}

export interface SearchProfileType {
	pictureUrl: string;
	badges: string[];
}

export interface SearchStatusType {
	status: "online" | "idle" | "dnd" | "offline";
}

export interface MinProfUserType {
	_id: string;
	account: {
		username: string;
		tag: string;
		private: boolean;
	};
	profile: {
		bannerUrl: string;
		pictureUrl: string;
		description: string;
		followingIds: string[];
		followerIds: string[];
		badges: string[];
		linkedProfiles: string[];
	};
	social: {
		postIds: string[];
		blogIds: string[];
	};
	status: string;
}

//we just need the status for most sorting, but within each status...
//we might choose to sort by id (for consistency) or more likely: badges
export interface SortUserType {
	_id: string;
	profile: {
		badges: string[];
	};
	status: "online" | "idle" | "dnd" | "offline";
}
