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
	},
);

export const YouTubeGlobalProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const iFrameRef = useRef<YouTubePlayer | null>(null);
	const [url, setUrl] = useState<string>(
		"https://www.youtube.com/watch?v=bqigIHMComE",
	);
	const onProgress = useRef(null);
	const onPlayerStateChange = useRef(null);

	return (
		<Context.Provider
			value={{
				iFrameRef: iFrameRef,
				url: url,
				setUrl: setUrl,
				onProgress: onProgress,
				onPlayerStateChange: onPlayerStateChange,
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
