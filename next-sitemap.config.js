module.exports = {
	siteUrl: process.env.SITE_URL || "https://musicnotes.sytes.net/",
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
				disallow: "/*",
			},
		],
	},
};
