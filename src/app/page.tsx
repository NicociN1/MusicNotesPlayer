"use client";
import MenuBar from "@/components/elements/Menu/MenuBar";
import MusicControlBar from "@/components/elements/Music/MusicControlBar";
import MusicScore from "@/components/elements/Score/MusicScore";
import Score from "@/components/elements/Score/Score";
import {
	MenuBarLayout,
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

const ContentProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ScrollProvider>
			<MusicScoresProvider>
				<YouTubeGlobalProvider>
					<YouTubeVolumeProvider>{children}</YouTubeVolumeProvider>
				</YouTubeGlobalProvider>
			</MusicScoresProvider>
		</ScrollProvider>
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
			<RootLayout>
				<ThemeProvider theme={theme}>
					<UIVisibilityProvider>
						<ContentProvider>
							<MenuBarLayout>
								<MenuBar /> {/* ControlBar */}
							</MenuBarLayout>
							<ScoreSpaceLayout
								id="scores-layout"
								onContextMenu={(e) => e.preventDefault()}
							>
								<MusicScore />
							</ScoreSpaceLayout>
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

// window.addEventListener("beforeunload", (e) => e.preventDefault());
