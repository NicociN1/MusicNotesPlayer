import { useUIVisibility } from "@/hooks/UIVisibilityGlobal";
import { useYouTubeGlobal } from "@/hooks/YouTubeGlobal";
import styled from "@emotion/styled";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import YouTubePlayer from "react-player/youtube";

const YouTubePlayerWrapper = styled.div`
  width: 307px;
  height: 173px;
  box-shadow: 0 0 8px black;
  transition: 0.3s width ease-in-out, 0.3s height ease-in-out;
	background-color: #222;
	position: absolute;
	bottom: calc(100%);
`;

const YouTubeIFrame = () => {
	const { url, iFrameRef, onProgress, onPlayerStateChange } =
		useYouTubeGlobal();
	const { visibleIFrame } = useUIVisibility();

	return (
		<YouTubePlayerWrapper style={visibleIFrame ? {} : { width: 0, height: 0 }}>
			{url ? (
				<YouTubePlayer
					url={url}
					width="100%"
					height="100%"
					ref={(player) => {
						iFrameRef.current = player;
					}}
					config={{
						playerVars: {
							controls: 0,
							disablekb: 1,
						},
					}}
					progressInterval={200}
					onProgress={(state) => {
						onProgress.current?.(state.playedSeconds);
					}}
					onPlay={() => {
						onPlayerStateChange.current?.(1);
					}}
					onPause={() => {
						onPlayerStateChange.current?.(2);
					}}
					onEnded={() => {
						onPlayerStateChange.current?.(3);
					}}
				/>
			) : null}
		</YouTubePlayerWrapper>
	);
};

export default YouTubeIFrame;
