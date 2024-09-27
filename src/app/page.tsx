"use client";
import MenuBar from "@/components/elements/Menu/MenuBar";
import MusicControlBar from "@/components/elements/Music/MusicControlBar";
import MusicScore from "@/components/elements/Score/MusicScore";
import Score from "@/components/elements/Score/Score";
import {
	MenuBarLayout,
	MusicControlBarLayout,
	RootLayout,
	ScoresLayout,
} from "@/components/layouts/RootLayouts";
import { MusicScoresProvider, useScoresGlobal } from "@/hooks/ScoresGlobal";
import { UIVisibilityProvider } from "@/hooks/UIVisibilityGlobal";
import { YouTubeGlobalProvider } from "@/hooks/YouTubeGlobal";
import { YouTubeVolumeProvider } from "@/hooks/YouTubeVolumeProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
			<RootLayout>
				<ThemeProvider theme={theme}>
					<UIVisibilityProvider>
						<ContentProvider>
							<MenuBarLayout>
								<MenuBar /> {/* ControlBar */}
							</MenuBarLayout>
							<ScoresLayout id="scores-layout" onContextMenu={(e) => e.preventDefault()}>
								<MusicScore />
							</ScoresLayout>
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
