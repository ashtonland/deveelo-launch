//image optimization, changes the request url based on inputs
//aka - server images at smaller sizes based on usage

import { ImageLoader, ImageLoaderProps } from "next/image";
import { getServerUrl, getWebUrl } from "../lib/links";

export const bannerLoader: ImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
	//if using the default cups, this file will be on the frontend
	const isDefault = src.startsWith("/user_content");

	if (isDefault) {
		return `${getWebUrl()}/${src}?w=${width}&q=${quality || 75}`;
	} else {
		//we append the time as a parameter in the link to break the cache since
		//a new image has been made at the same url, but next will just load the old
		//image instead of checking to find the newly changed image at that url
		//by using a unique link every time, we break the cache and network fetch always
		return `${getServerUrl("uploads")}${src}?` + new Date().getTime();
	}
};

//banner loader but stripped of the extra multifunctional parts. This only needs to load
//images from the server and does not need a cache breaker, thus improving performance
export const postLoader: ImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
	return `${getServerUrl("uploads")}${src}`;
};

//used for compiling image source for link preview meta
export const metaLoader = (src: string, path: string): string => {
	//if using the default cups, this file will be on the frontend
	const isDefault = src.startsWith("/user_content");

	if (isDefault) {
		return `${getWebUrl()}/${src}?q=${75}`;
	} else {
		return `${getServerUrl(path)}${src}?`;
	}
};
