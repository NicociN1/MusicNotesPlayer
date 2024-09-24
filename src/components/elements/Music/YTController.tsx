import { useYouTubeGlobal } from "@/hooks/YouTubeGlobal";
import { useYouTubeVolume } from "@/hooks/YouTubeVolumeProvider";
import timeFormat from "@/utils/timeFormat";
import styled from "@emotion/styled";
import {
	FastForward,
	FastRewind,
	Pause,
	PlayArrow,
	SkipPrevious,
	VolumeUp,
} from "@mui/icons-material";
import { IconButton, Slider, Tooltip } from "@mui/material";
import { useState } from "react";

const RowContentsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AnimateSlider = styled(Slider)`
  transition: width 0.3s;
  margin: auto 0;
  color: white;

  &.show {
    visibility: visible;
    animation: fadeIn 0.3s forwards;
  }
  &.hide {
    animation: fadeOut 0.3s forwards;
  }
  @keyframes fadeOut {
    0% {
    }
    100% {
      visibility: hidden;
      opacity: 0.2;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }
`;

const YouTubeController = () => {
	const { iFrameRef, onProgress, onPlayerStateChange } = useYouTubeGlobal();
	const { volume, setVolume } = useYouTubeVolume();
	const [isPlaying, setPlaying] = useState<boolean>(false);
	const [sliderTime, setSliderTime] = useState<number>(0);
	const [isVisibleVolume, setVisibleVolume] = useState<boolean>(false);

	const seekTo = (time: number, seekEnd = true) => {
		const iFrame = iFrameRef.current;
		if (!iFrame) return;
		iFrame.getInternalPlayer().seekTo(time, true);
		setSliderTime(time);
	};

	const clickPlay = () => {
		const iFrame = iFrameRef.current;
		if (!iFrame) return;
		iFrame.getInternalPlayer().playVideo();
	};
	const clickPause = () => {
		const iFrame = iFrameRef.current;
		if (!iFrame) return;
		iFrame.getInternalPlayer().pauseVideo();
	};
	const clickPrev = () => {
		const iFrame = iFrameRef.current;
		if (!iFrame) return;
		seekTo(0);
	};
	const sliderSeek = (time: number) => {
		seekTo(time, false);
	};
	const sliderSeekEnd = (time: number) => {
		seekTo(time, true);
	};
	const clickForward = () => {
		const iFrame = iFrameRef.current;
		if (!iFrame) return;
		const currentTime = iFrame.getCurrentTime();
		seekTo(currentTime + 5);
	};
	const clickRewind = () => {
		const iFrame = iFrameRef.current;
		if (!iFrame) return;
		const currentTime = iFrame.getCurrentTime();
		seekTo(currentTime - 5);
	};
	const sliderVolume = (volume: number) => {
		const iFrame = iFrameRef.current;
		if (!iFrame) return;
		setVolume(volume);
		iFrame.getInternalPlayer().setVolume(volume);
	};

	onProgress.current = (time: number) => {
		setSliderTime(time);
	};
	onPlayerStateChange.current = (state: number) => {
		const iFrame = iFrameRef.current;
		if (!iFrame) return;
		setPlaying(state === 1);
		iFrame.getInternalPlayer().setVolume(volume);
	};

	return (
		<>
			<RowContentsContainer>
				<IconButton>
					<SkipPrevious
						sx={{ fontSize: "40px", color: "white" }}
						onClick={() => clickPrev()}
					/>
				</IconButton>
				<IconButton>
					<FastRewind
						sx={{ fontSize: "40px", color: "white" }}
						onClick={() => clickRewind()}
					/>
				</IconButton>
				<IconButton>
					{isPlaying ? (
						<Pause
							sx={{ fontSize: "64px", color: "white" }}
							onClick={() => clickPause()}
						/>
					) : (
						<PlayArrow
							sx={{ fontSize: "64px", color: "white" }}
							onClick={() => clickPlay()}
						/>
					)}
				</IconButton>
				<IconButton>
					<FastForward
						sx={{ fontSize: "40px", color: "white" }}
						onClick={() => clickForward()}
					/>
				</IconButton>
				<IconButton>
					<VolumeUp
						sx={{ fontSize: "40px", color: "white" }}
						onClick={() => setVisibleVolume(!isVisibleVolume)}
					/>
				</IconButton>
				<AnimateSlider
					min={0}
					step={1}
					max={100}
					value={volume}
					defaultValue={100}
					valueLabelDisplay="auto"
					className={isVisibleVolume ? "show" : "hide"}
					style={{ width: isVisibleVolume ? "80px" : "0" }}
					onChange={(_ev, value) => sliderVolume(value as number)}
				/>
			</RowContentsContainer>
			<Tooltip
				title={`${timeFormat(Math.floor(sliderTime))} / -${timeFormat(Math.floor((iFrameRef.current?.getDuration() ?? 0) - sliderTime))}`}
				placement="top"
			>
				<Slider
					value={sliderTime}
					max={iFrameRef.current?.getDuration() ?? 0}
					onChange={(ev, data) => sliderSeek(data as number)}
					onChangeCommitted={(ev, data) => sliderSeekEnd(data as number)}
					sx={{
						maxWidth: "min(450px, max(100vw - 128px, 230px))",
						color: "white",
					}}
				/>
			</Tooltip>
		</>
	);
};

export default YouTubeController;
