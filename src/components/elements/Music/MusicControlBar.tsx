"use client";
import {
	CenterItemsLayout,
	YouTubeIFrameLayout,
} from "@/components/layouts/MusicControlBarLayouts";
import styled from "@emotion/styled";
import YouTubeController from "./YTController";
import YouTubeIFrame from "./YTIFrame";
import YouTubeMinimize from "./YTMinimize";

const MusicControlBarWrapper = styled.div`
  background-color: #202020cc;
  width: min(600px, max(100vw - 32px, 320px));
  height: 100%;
  position: relative;
	border-radius: 40px;
`;

const MusicControlBar = () => {
	return (
		<MusicControlBarWrapper>
			<YouTubeIFrameLayout>
				<YouTubeIFrame />
			</YouTubeIFrameLayout>
			<YouTubeMinimize />
			<CenterItemsLayout>
				{/* <TextField
					label="YouTubeURL"
					variant="standard"
					sx={{ width: "300px" }}
					autoComplete="off"
				/> */}
				<YouTubeController />
			</CenterItemsLayout>
		</MusicControlBarWrapper>
	);
};

export default MusicControlBar;
