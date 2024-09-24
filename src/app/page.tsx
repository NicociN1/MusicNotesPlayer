"use client";
import MenuBar from "@/components/elements/Menu/MenuBar";
import MusicControlBar from "@/components/elements/Music/MusicControlBar";
import MusicScore from "@/components/elements/Score/MusicScore";
import {
	MenuBarLayout,
	MusicControlBarLayout,
	RootLayout,
	ScoreLayout,
} from "@/components/layouts/RootLayouts";
import { MusicScoresProvider } from "@/hooks/MusicScoresGlobal";
import { UIVisibilityProvider } from "@/hooks/UIVisibilityGlobal";
import { YouTubeGlobalProvider } from "@/hooks/YouTubeGlobal";
import { YouTubeVolumeProvider } from "@/hooks/YouTubeVolumeProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Head from "next/head";

const ContentProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<MusicScoresProvider>
			<YouTubeGlobalProvider>
				<YouTubeVolumeProvider>{children}</YouTubeVolumeProvider>
			</YouTubeGlobalProvider>
		</MusicScoresProvider>
	);
};
const theme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App(): JSX.Element {
	return (
		<>
			<Head>
				<title>MusicNotesPlayer - Next.js</title>
			</Head>
			<RootLayout>
				<ThemeProvider theme={theme}>
					<UIVisibilityProvider>
						<MenuBarLayout>
							<MenuBar /> {/* ControlBar */}
						</MenuBarLayout>
						<ContentProvider>
							<ScoreLayout>
								<MusicScore /> {/* MusicScore */}
							</ScoreLayout>
							<MusicControlBarLayout>
								<MusicControlBar /> {/* MusicControlBar */}
							</MusicControlBarLayout>
						</ContentProvider>
					</UIVisibilityProvider>
				</ThemeProvider>
			</RootLayout>
		</>
	);
}

export default App;
