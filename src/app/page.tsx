"use client";
import MenuBar from "@/components/elements/Menu/MenuBar";
import MusicControlBar from "@/components/elements/Music/MusicControlBar";
import MusicScore from "@/components/elements/Score/MusicScore";
import {
	ContentsLayout,
	MusicControlBarLayout,
	RootLayout,
	ScoreSpaceLayout,
} from "@/components/layouts/RootLayouts";
import { MusicScoresProvider, useScoresGlobal } from "@/hooks/ScoresGlobal";
import { ScrollProvider } from "@/hooks/ScrollGlobal";
import { UIVisibilityProvider } from "@/hooks/UIVisibilityGlobal";
import { YouTubeGlobalProvider } from "@/hooks/YouTubeGlobal";
import { YouTubeVolumeProvider } from "@/hooks/YouTubeVolumeProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect } from "react";

const theme = createTheme({
	palette: {
		mode: "dark",
	},
});
const ContentProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider theme={theme}>
			<UIVisibilityProvider>
				<ScrollProvider>
					<MusicScoresProvider>
						<YouTubeGlobalProvider>
							<YouTubeVolumeProvider>{children}</YouTubeVolumeProvider>
						</YouTubeGlobalProvider>
					</MusicScoresProvider>
				</ScrollProvider>
			</UIVisibilityProvider>
		</ThemeProvider>
	);
};

function App(): JSX.Element {
	return (
		<>
			<RootLayout>
				<ContentProvider>
					<ContentsLayout>
						<div>
							<MenuBar /> {/* ControlBar */}
						</div>
						<ScoreSpaceLayout
							id="scores-layout"
							onContextMenu={(e) => e.preventDefault()}
						>
							<MusicScore />
						</ScoreSpaceLayout>
						<MusicControlBarLayout>
							<MusicControlBar /> {/* MusicControlBar */}
						</MusicControlBarLayout>
					</ContentsLayout>
				</ContentProvider>
			</RootLayout>
		</>
	);
}

export default App;

// window.addEventListener("beforeunload", (e) => e.preventDefault());
