export const setSideBarByTag = (tag: string): void => {
	window.localStorage.setItem("side_prof", tag);

	//This is used to keep track of the modifications to the display follower count
	//Stores the absolute change that has occured to the original value. i.e. we follow
	//and the fmod increases to 1 (this can be added to the count display), then we unfollow
	//and it goes back to 0 where it is reset to "". If we unfollow first, value goes to -1 -> 0
	window.localStorage.setItem("fmod", "");
};

export interface Fmod {
	set: boolean;
	value: number;
	tag: string;
}
