import Image from "next/image";

import sideStyles from "../styles/sideImage.module.css";

const images = [
	{
		source: "/banners/pen.webp",
		link: (
			<a className={sideStyles.credit} href="https://unsplash.com/@sixteenmilesout?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">
				Photo by Sixteen Miles Out on Unsplash
			</a>
		),
	},
	{
		source: "/banners/candle.webp",
		link: (
			<a className={sideStyles.credit} href="https://unsplash.com/@sixteenmilesout?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">
				Photo by Sixteen Miles Out on Unsplash
			</a>
		),
	},
];

const SideImage = ({ route, hardEdge }: { route: string; hardEdge: boolean }) => {
	return (
		<div className={hardEdge ? sideStyles.imageContainer_full : sideStyles.imageContainer}>
			{route === "/login" ? images[1].link : images[0].link}
			<Image className={sideStyles.picture} src={route === "/login" ? images[1].source : images[0].source} alt="city street" layout="fill" objectFit="cover" priority={true} />
		</div>
	);
};

export default SideImage;
