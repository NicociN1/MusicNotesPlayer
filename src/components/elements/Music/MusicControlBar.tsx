"use client";
import { CenterItemsLayout } from "@/components/layouts/MusicControlBarLayouts";
import styled from "@emotion/styled";
import YouTubeIFrame from "../Menu/YTIFrame";
import YouTubeController from "./YTController";

const MusicControlBarWrapper = styled.div`
  background-color: #111;
  width: 100%;
  height: 100%;
  position: relative;
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
