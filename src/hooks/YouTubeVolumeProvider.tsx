"use client";
import PropTypes from "prop-types";
import React, { createContext, useContext, useState } from "react";

const Context = createContext(
	{} as {
		volume: number;
		setVolume: React.Dispatch<React.SetStateAction<number>>;
	},
);

export const YouTubeVolumeProvider = ({ children }: { children: React.ReactNode }) => {
	const [volume, setVolume] = useState(50);

	return (
		<Context.Provider
			value={{
				volume: volume,
				setVolume: setVolume,
			}}
		>
			{children}
		</Context.Provider>
	);
};

YouTubeVolumeProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useYouTubeVolume = () => useContext(Context);
