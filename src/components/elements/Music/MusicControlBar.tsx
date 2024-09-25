"use client";
import { CenterItemsLayout } from "@/components/layouts/MusicControlBarLayouts";
import styled from "@emotion/styled";
import YouTubeIFrame from "../Menu/YTIFrame";
import YouTubeController from "./YTController";

const MusicControlBarWrapper = styled.div`
  background-color: #222222cc;
  width: min(600px, max(100vw - 32px, 320px));
  height: 100%;
  position: relative;
	border-radius: 40px;
	backdrop-filter: blur(2px);
`;

const MusicControlBar = () => {
	return (
		<MusicControlBarWrapper>
			<CenterItemsLayout>
				<YouTubeController />
			</CenterItemsLayout>
		</MusicControlBarWrapper>
	);
};

export default MusicControlBar;
