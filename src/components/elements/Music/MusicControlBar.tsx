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
  box-shadow: 0 0 6px #111;
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
