"use client";
import PropTypes from "prop-types";
import React, {
	createContext,
	useContext,
	useState,
} from "react";

const Context = createContext(
	{} as {
		visibleIFrame: boolean;
		setVisibleIFrame: React.Dispatch<
			React.SetStateAction<boolean>
		>;
	},
);

export const UIVisibilityProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [visibleIFrame, setVisibleIFrame] =
		useState<boolean>(true);

	return (
		<Context.Provider
			value={{
				visibleIFrame: visibleIFrame,
				setVisibleIFrame: setVisibleIFrame,
			}}
		>
			{children}
		</Context.Provider>
	);
};

UIVisibilityProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useUIVisibility = () => useContext(Context);
