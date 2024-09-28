import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import { useYouTubeGlobal } from "@/hooks/YouTubeGlobal";
import { useYouTubeVolume } from "@/hooks/YouTubeVolumeProvider";
import { scoreScroller } from "@/utils/scoreScroller";
import timeFormat from "@/utils/timeFormat";
import styled from "@emotion/styled";
import {
	FastForward,
	FastRewind,
	FastRewindRounded,
	Pause,
	PauseRounded,
	PlayArrow,
	PlayArrowRounded,
	SkipPrevious,
	SkipPreviousRounded,
	VolumeOff,
	VolumeOffRounded,
	VolumeUp,
	VolumeUpRounded,
} from "@mui/icons-material";
import { IconButton, Slider, Tooltip } from "@mui/material";
import { useRef, useState } from "react";
import { isMobile } from "react-device-detect";

const YTControllerWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-rows: 64px 1fr;
	grid-template-columns: 1fr;
  place-items: center;
`;

const RowContentsContainer = styled.div`
	width: 100%;
	height: 100%;
  display: flex;
  justify-content: center;
`;

const AnimateSlider = styled(Slider)`
  transition: width 0.3s;
  color: white;

  &.show {
    visibility: visible;
    animation: fadeIn 0.1s forwards;
  }
  &.hide {
    animation: fadeOut 0.1s forwards;
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
	const { volume, setVolume } = useYouTubeVolume();
	const [isMuted, setMute] = useState<boolean>(false);
	const [sliderTime, setSliderTime] = useState<number>(0);
	const [isPlaying, setPlaying] = useState<boolean>(false);
	const [isVisibleVolume, setVisibleVolume] = useState<boolean>(false);
	const { iFrameRef, onProgress, onPlayerStateChange } = useYouTubeGlobal();
	const beforePlaying = useRef<boolean | null>(null);
	const { getMainScore, musicSettings: saveData } = useScoresGlobal();
	const lastMeasureCount = useRef(0);

	const seekTo = (time: number, seekEnd = true) => {
		const iFrame = iFrameRef.current;
		if (!iFrame) return;
		iFrame.getInternalPlayer().seekTo(time, true);
		setSliderTime(time);
		if (!seekEnd) {
			if (beforePlaying.current == null) {
				beforePlaying.current = iFrame.getInternalPlayer().getPlayerState() === 1;
			}
			iFrame.getInternalPlayer().pauseVideo();
		} else if (beforePlaying.current) {
			iFrame.getInternalPlayer().playVideo();
			beforePlaying.current = null;
		}
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
	const clickToggleMute = () => {
		const iFrame = iFrameRef.current;
		if (!iFrame) return;
		const _isMuted = isMuted;
		setMute(!isMuted);
		if (_isMuted) {
			setVolume(100);
			iFrame.getInternalPlayer().unMute();
		} else {
			setVolume(0);
			iFrame.getInternalPlayer().mute();
		}
	};

	onProgress.current = (time: number) => {
		setSliderTime(time);
		const mainScore = getMainScore();
		const delayedTime = time - saveData.startTime;
		if (!mainScore || !isPlaying || delayedTime < 0) return;
		const beatTime = 60 / saveData.bpm;
		const currentMeasureCount = Math.floor(delayedTime / beatTime / mainScore.beatCount);
		if (
			lastMeasureCount.current !== currentMeasureCount &&
			lastMeasureCount.current >= 0
		) {
			console.log(currentMeasureCount, lastMeasureCount.current);
			lastMeasureCount.current = currentMeasureCount;
			scoreScroller(saveData.bpm, delayedTime, mainScore);
		}
	};
	onPlayerStateChange.current = (state: number) => {
		const iFrame = iFrameRef.current;
		if (!iFrame) return;
		setPlaying(state === 1);
		iFrame.getInternalPlayer().setVolume(volume);
	};

	return (
		<YTControllerWrapper>
			<RowContentsContainer>
				<Tooltip placement="top" title="Restart">
					<IconButton aria-label="Restart">
						<SkipPreviousRounded
							sx={{ fontSize: "32px", color: "white" }}
							onClick={() => clickPrev()}
						/>
					</IconButton>
				</Tooltip>
				<Tooltip placement="top" title="Skip Rewind">
					<IconButton aria-label="Skip Rewind">
						<FastRewindRounded
							sx={{ fontSize: "32px", color: "white" }}
							onClick={() => clickRewind()}
						/>
					</IconButton>
				</Tooltip>
				<Tooltip placement="top" title={isPlaying ? "Pause" : "Play"}>
					<IconButton aria-label={isPlaying ? "Pause" : "Play"}>
						{isPlaying ? (
							<PauseRounded
								sx={{ fontSize: "48px", color: "white" }}
								onClick={() => clickPause()}
							/>
						) : (
							<PlayArrowRounded
								sx={{ fontSize: "48px", color: "white" }}
								onClick={() => clickPlay()}
							/>
						)}
					</IconButton>
				</Tooltip>
				<Tooltip placement="top" title="Skip Forward">
					<IconButton aria-label="Skip Forward">
						<FastForward
							sx={{ fontSize: "32px", color: "white" }}
							onClick={() => clickForward()}
						/>
					</IconButton>
				</Tooltip>
				<Tooltip placement="top" title="Change Volume">
					<IconButton aria-label="Change Volume">
						{!isMuted ? (
							<VolumeUpRounded
								sx={{ fontSize: "32px", color: "white" }}
								onClick={() => {
									console.log(isMobile);
									if (!isMobile) {
										setVisibleVolume(!isVisibleVolume);
									} else {
										clickToggleMute();
									}
								}}
							/>
						) : (
							<VolumeOffRounded
								sx={{ fontSize: "32px", color: "white" }}
								onClick={() => clickToggleMute()}
							/>
						)}
					</IconButton>
				</Tooltip>
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
						maxWidth: "max(calc(80%), 300px)",
						color: "white",
					}}
				/>
			</Tooltip>
		</YTControllerWrapper>
	);
};

export default YouTubeController;
