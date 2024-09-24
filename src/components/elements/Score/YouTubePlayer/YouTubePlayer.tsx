"use client";
import { useYouTubeVolume } from "@/hooks/YouTubeVolumeProvider";
import styled from "@emotion/styled";
import getYouTubeID from "get-youtube-id";
import { useEffect, useRef, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { OnProgressProps } from "react-player/base";
import MinimizeButton from "./MinimizeButton";
import PlayerController, { PlayerControllerHandle } from "./PlayerControler";
// import { useMusicScores } from '@/hooks/MusicScoresProvider'
import VideoUrlBar from "./YouTubeUrlBar";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const YouTubePlayerContainer = styled.div`
  box-shadow: 8px 8px 0 #444;
  background-color: #111;
  display: flex;
  width: 384px;
  height: 216px;
`;
const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(16px);
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  box-shadow: -1px 1px 8px gray;
  border-radius: 16px;

  visibility: visible;
  pointer-events: auto;
  &.minimized {
    visibility: hidden;
    width: 0%;
    height: 0%;
  }
`;

const YouTubePlayer = () => {
	const playerControllerRef = useRef<PlayerControllerHandle | null>(null);
	const reactPlayerRef = useRef<ReactPlayer | null>(null);
	const videoContainerRef = useRef<HTMLDivElement | null>(null);
	const [videoUrl, setVideoUrl] = useState<string>(
		"https://youtube.com/watch?v=0xSiBpUdW4E",
	);

	const { volume } = useYouTubeVolume();
	// const { setScoreScroll } = useMusicScores()
	const volumeRef = useRef<number>(volume);

	useEffect(() => {
		volumeRef.current = volume;
	}, [volume]);

	const onPlayerReady = (event: ReactPlayerProps) => {
		if (!reactPlayerRef.current || !playerControllerRef.current) return;
		playerControllerRef.current.setVideoTime(
			reactPlayerRef.current.getDuration(),
		);
		reactPlayerRef.current.getInternalPlayer().setVolume(volume);

		console.log("Player Ready");
	};
	const onProgress = (state: OnProgressProps) => {
		if (!reactPlayerRef.current || !playerControllerRef.current) return;
		playerControllerRef.current.setVideoCurrentTime(state.playedSeconds);
	};

	const loadVideo = (url: string) => {
		if (!reactPlayerRef.current) return;
		setVideoUrl(url);
	};

	const seekTo = (time: number) => {
		if (!reactPlayerRef.current) return;
		reactPlayerRef.current.getInternalPlayer().seekTo(time);
	};

	return (
		<Wrapper>
			<MinimizeButton
				onClick={(minimized) => {
					if (!videoContainerRef.current) return;
					const videoRef = videoContainerRef.current;
					if (minimized) {
						videoRef.classList.add("minimized");
					} else {
						videoRef.classList.remove("minimized");
					}
				}}
			/>
			<VideoContainer ref={videoContainerRef}>
				<VideoUrlBar handleUrlSubmit={loadVideo} />
				<YouTubePlayerContainer>
					<ReactPlayer
						ref={(player) => {
							reactPlayerRef.current = player;
						}}
						url={videoUrl}
						width="100%"
						height="100%"
						controls={false}
						onReady={onPlayerReady}
						progressInterval={200}
						onProgress={onProgress}
						onPlay={() => playerControllerRef.current?.setIsPlaying(true)}
						onPause={() => playerControllerRef.current?.setIsPlaying(false)}
						onEnded={() => playerControllerRef.current?.setIsPlaying(false)}
						config={{
							youtube: {
								playerVars: {
									disablekb: 1,
								},
							},
						}}
					/>
					{/* <div id="youtube-player"></div> */}
				</YouTubePlayerContainer>
				<PlayerController
					ref={playerControllerRef}
					clickTogglePlay={() => {
						if (!reactPlayerRef.current || !playerControllerRef.current) return;
						const isPaused =
							reactPlayerRef.current.getInternalPlayer().getPlayerState() !== 1;
						if (isPaused) {
							reactPlayerRef.current.getInternalPlayer().playVideo();
						} else {
							reactPlayerRef.current.getInternalPlayer().pauseVideo();
						}
					}}
					changeVolume={(volume) => {
						if (!reactPlayerRef.current) return;
						reactPlayerRef.current.getInternalPlayer().setVolume(volume);
						volumeRef.current = volume;
					}}
					changeCurrentTime={(currentTime: number) => {
						const player = reactPlayerRef.current;
						if (!player) return;
						const duration = player.getDuration();
						seekTo(Math.min(currentTime, duration));
					}}
					clickMoveRewind={() => {
						const player = reactPlayerRef.current;
						if (!player) return;
						const currentTime = player.getCurrentTime();
						seekTo(Math.max(currentTime - 5, 0));
					}}
					clickMoveForward={() => {
						const player = reactPlayerRef.current;
						if (!player) return;
						const currentTime = player.getCurrentTime();
						seekTo(Math.max(currentTime + 5, 0));
					}}
					clickMoveStart={() => {
						const player = reactPlayerRef.current;
						if (!player) return;
						seekTo(0);
					}}
				/>
			</VideoContainer>
		</Wrapper>
	);
};
export default YouTubePlayer;
