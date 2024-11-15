import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Music Notes",
	description:
		"楽譜やYouTube動画などを設定でき、楽器の練習ができるサイトです。YouTube動画に合わせて楽譜が動き、楽しく練習することが出来ます。",
	keywords: "music notes practice youtube",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
