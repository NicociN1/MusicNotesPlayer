import { useGlobalShortcutKey } from "@/hooks/GlobalShortcutKey";
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
	SlowMotionVideo,
	SlowMotionVideoRounded,
	VolumeOff,
	VolumeOffRounded,
	VolumeUp,
	VolumeUpRounded,
} from "@mui/icons-material";
import { IconButton, Slider, Tooltip } from "@mui/material";
import { Dropdown, MenuProps } from "antd";
import { useRef, useState } from "react";
import { isMobile } from "react-device-detect";

const YTControllerWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-rows: 64px 1fr;
	grid-template-columns: 1fr;
  place-items: center;
  @media screen and (max-height: 460px) {
		grid-template-rows: 40px 1fr;
	}
`;

const RowContentsContainer = styled.div`
	height: 100%;
  display: flex;
	justify-content: center;
	align-items: center;
  @media screen and (max-height: 460px) {
		scale: 0.8;
	}
`;
const ProgressSlider = styled(Slider)`
	max-width: max(calc(80%), 300px);
	color: white;
	padding: 0 !important;
  @media screen and (max-height: 460px) {
		scale: 0.8;
	}
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

const ButtonItem = styled.div`
	cursor: pointer;
`;

const YouTubeController = () => {
	const { volume, setVolume } = useYouTubeVolume();
	const [isMuted, setMute] = useState<boolean>(false);
	const [sliderTime, setSliderTime] = useState<number>(0);
	const [isPlaying, setPlaying] = useState<boolean>(false);
	const [isVisibleVolume, setVisibleVolume] = useState<boolean>(false);
	const { iFrameRef, onProgress, onPlayerStateChange } = useYouTubeGlobal();
	const beforePlaying = useRef<boolean | null>(null);
	const { getMainScore, musicSettings, lineRef } = useScoresGlobal();
	const lastMeasureCount = useRef(0);

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<ButtonItem
					onClick={() => {
						iFrameRef.current?.getInternalPlayer().setPlaybackRate(1.0);
					}}
				>
					1.0倍速
				</ButtonItem>
			),
		},
		{
			key: "2",
			label: (
				<ButtonItem
					onClick={() => {
						iFrameRef.current?.getInternalPlayer().setPlaybackRate(0.9);
					}}
				>
					0.9倍速
				</ButtonItem>
			),
		},
		{
			key: "3",
			label: (
				<ButtonItem
					onClick={() => {
						iFrameRef.current?.getInternalPlayer().setPlaybackRate(0.75);
					}}
				>
					0.75倍速
				</ButtonItem>
			),
		},
		{
			key: "4",
			label: (
				<ButtonItem
					onClick={() => {
						iFrameRef.current?.getInternalPlayer().setPlaybackRate(0.5);
					}}
				>
					0.5倍速
				</ButtonItem>
			),
		},
		{
			key: "5",
			label: (
				<ButtonItem
					onClick={() => {
						iFrameRef.current?.getInternalPlayer().setPlaybackRate(0.25);
					}}
				>
					0.25倍速
				</ButtonItem>
			),
		},
	];

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
		const delayedTime = time - musicSettings.startTime;
		if (!mainScore || !isPlaying || delayedTime < 0) return;
		const beatTime = 60 / musicSettings.bpm;
		const currentMeasureCount = Math.floor(delayedTime / beatTime / mainScore.beatCount);
		if (currentMeasureCount >= mainScore.measureCount) return;
		if (
			lastMeasureCount.current !== currentMeasureCount &&
			lastMeasureCount.current >= 0
		) {
			lastMeasureCount.current = currentMeasureCount;
			scoreScroller(musicSettings.bpm, delayedTime, mainScore);
		}
		const line = lineRef.current;
		if (line) {
			console.log(
				mainScore.beatSize * mainScore.beatCount,
				delayedTime / ((musicSettings.bpm / 60) * mainScore.beatCount),
			);
			line.style.left = `${mainScore.beatSize * mainScore.beatCount * (delayedTime / ((60 / musicSettings.bpm) * mainScore.beatCount))}px`;
		}
	};
	onPlayerStateChange.current = (state: number) => {
		const iFrame = iFrameRef.current;
		if (!iFrame) return;
		setPlaying(state === 1);
		iFrame.getInternalPlayer().setVolume(volume);
	};

	useGlobalShortcutKey([
		{
			key: " ",
			action: () => {
				if (isPlaying) {
					clickPause();
				} else {
					clickPlay();
				}
			},
		},
		{
			key: "ArrowLeft",
			action: () => {
				clickRewind();
			},
		},
		{
			key: "ArrowRight",
			action: () => {
				clickForward();
			},
		},
		{
			key: "ArrowDown",
			ctrlKey: true,
			action: () => {
				const iFrame = iFrameRef.current;
				if (!iFrame) return;
				const changedVolume = Math.max(0, volume - 5);
				setVolume(changedVolume);
				iFrame.getInternalPlayer().setVolume(changedVolume);
			},
		},
		{
			key: "ArrowUp",
			ctrlKey: true,
			action: () => {
				const iFrame = iFrameRef.current;
				if (!iFrame) return;
				const changedVolume = Math.max(0, volume + 5);
				setVolume(changedVolume);
				iFrame.getInternalPlayer().setVolume(changedVolume);
			},
		},
	]);

	return (
		<YTControllerWrapper>
			<RowContentsContainer>
				<Dropdown
					trigger={["click"]}
					menu={{ items, selectable: true, defaultSelectedKeys: ["1"] }}
				>
					<Tooltip placement="top" title="Speed">
						<IconButton>
							<SlowMotionVideoRounded sx={{ fontSize: "32px", color: "white" }} />
						</IconButton>
					</Tooltip>
				</Dropdown>
				<Tooltip placement="top" title="Skip Rewind (←)">
					<IconButton aria-label="Skip Rewind (←)" onClick={() => clickRewind()}>
						<FastRewindRounded sx={{ fontSize: "32px", color: "white" }} />
					</IconButton>
				</Tooltip>
				<Tooltip placement="top" title={`${isPlaying ? "Pause" : "Play"} (Space)`}>
					{isPlaying ? (
						<IconButton aria-label="Pause (Space)">
							<PauseRounded
								sx={{ fontSize: "52px", color: "white" }}
								onClick={() => clickPause()}
							/>
						</IconButton>
					) : (
						<IconButton aria-label="Play (Space)">
							<PlayArrowRounded
								sx={{ fontSize: "52px", color: "white" }}
								onClick={() => clickPlay()}
							/>
						</IconButton>
					)}
				</Tooltip>
				<Tooltip placement="top" title="Skip Forward (→)">
					<IconButton aria-label="Skip Forward (→)" onClick={() => clickForward()}>
						<FastForward sx={{ fontSize: "32px", color: "white" }} />
					</IconButton>
				</Tooltip>
				<Tooltip placement="top" title="Change Volume (↑/↓)">
					<IconButton aria-label="Change Volume">
						{!isMuted ? (
							<VolumeUpRounded
								sx={{ fontSize: "32px", color: "white" }}
								onClick={() => {
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
			</RowContentsContainer>{" "}
			<Tooltip
				title={`${timeFormat(Math.floor(sliderTime))} / -${timeFormat(Math.floor((iFrameRef.current?.getDuration() ?? 0) - sliderTime))}`}
				placement="top"
			>
				<ProgressSlider
					value={sliderTime}
					max={iFrameRef.current?.getDuration() ?? 0}
					onChange={(ev, data) => sliderSeek(data as number)}
					onChangeCommitted={(ev, data) => sliderSeekEnd(data as number)}
				/>
			</Tooltip>
		</YTControllerWrapper>
	);
};

export default YouTubeController;
