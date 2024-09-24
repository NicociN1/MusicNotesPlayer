import { useUIVisibility } from "@/hooks/UIVisibilityGlobal";
import styled from "@emotion/styled";
import { CloseFullscreen, OpenInFull } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const YouTubeMinimizeWrapper = styled.div`
  width: 30px;
  height: 30px;
  background-color: grey;
  position: absolute;
  top: -30px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  z-index: 10;
`;

const YouTubeMinimize = () => {
	const { visibleIFrame, setVisibleIFrame } = useUIVisibility();

	return (
		<YouTubeMinimizeWrapper>
			<IconButton onClick={() => setVisibleIFrame(!visibleIFrame)}>
				{visibleIFrame ? <CloseFullscreen /> : <OpenInFull />}
			</IconButton>
		</YouTubeMinimizeWrapper>
	);
};

export default YouTubeMinimize;
