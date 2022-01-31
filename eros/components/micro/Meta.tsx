import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
	return (
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<meta charSet="utf-8" />

			{/* Favicons */}
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
			<link rel="manifest" href="/site.webmanifest"></link>
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f79f1b"></link>
			<meta name="msapplication-TileColor" content="#20296b"></meta>
			<meta name="theme-color" content="#0d154a"></meta>

			<title>{title}</title>
			<meta property="og:image" content="/embedlogo.png"></meta>
			<meta property="og:title" content="Deveelo"></meta>
			<meta property="og:url" content="https://www.deveelo.com"></meta>
			<meta property="og:description" content={description}></meta>
		</Head>
	);
};

Meta.defaultProps = {
	title: "Deveelo",
	keywords: "game development, devlogs, beta testing, gamedev, beta, videogames, posting, communities, groups, art",
	description: "Live betas, groups with likeminded game devleopers and their latest updates in realtime - it can all be found here on Deveelo, the social platform for game developers and artists",
};

export default Meta;
