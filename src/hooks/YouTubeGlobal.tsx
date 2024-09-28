"use client";
import PropTypes from "prop-types";
import React, {
	createContext,
	MutableRefObject,
	useContext,
	useRef,
	useState,
} from "react";
import YouTubePlayer, { YouTubePlayerProps } from "react-player/youtube";

const Context = createContext(
	{} as {
		iFrameRef: MutableRefObject<YouTubePlayer | null>;
		url: string;
		setUrl: React.Dispatch<React.SetStateAction<string>>;
		onProgress: MutableRefObject<((time: number) => void) | null>;
		onPlayerStateChange: MutableRefObject<((state: number) => void) | null>;
		currentTime: number;
		setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
		duration: number;
		setDuration: React.Dispatch<React.SetStateAction<number>>;
	},
);

export const YouTubeGlobalProvider = ({ children }: { children: React.ReactNode }) => {
	const iFrameRef = useRef<YouTubePlayer | null>(null);
	const [url, setUrl] = useState<string>("https://www.youtube.com/watch?v=bqigIHMComE");
	const onProgress = useRef(null);
	const onPlayerStateChange = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	return (
		<Context.Provider
			value={{
				iFrameRef: iFrameRef,
				url: url,
				setUrl: setUrl,
				onProgress: onProgress,
				onPlayerStateChange: onPlayerStateChange,
				currentTime: currentTime,
				setCurrentTime: setCurrentTime,
				duration: duration,
				setDuration: setDuration,
			}}
		>
			{children}
		</Context.Provider>
	);
};

YouTubeGlobalProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useYouTubeGlobal = () => useContext(Context);
