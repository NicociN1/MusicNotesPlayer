import React, { createContext, ReactNode, useContext, useRef } from "react";

const ScrollContext = createContext<React.RefObject<HTMLDivElement> | null>(null);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
	const containerRef = useRef<HTMLDivElement>(null); // refを作成

	return <ScrollContext.Provider value={containerRef}>{children}</ScrollContext.Provider>;
};

export const useScrollContainer = () => {
	const context = useContext(ScrollContext);
	if (context === null) {
		throw new Error("useScrollContainer must be used within a ScrollProvider");
	}
	return context;
};
