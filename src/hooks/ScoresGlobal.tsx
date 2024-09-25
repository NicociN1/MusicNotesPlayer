"use client";
import { NoteProps } from "@/components/elements/Score/Note";
import { ScoreProps } from "@/components/elements/Score/Score";
import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext(
	{} as {
		scoreScroll: number;
		setScoreScroll: React.Dispatch<React.SetStateAction<number>>;
		measureCount: number;
		setMeasureCount: React.Dispatch<React.SetStateAction<number>>;
		notes: NoteProps[];
		setNotes: React.Dispatch<React.SetStateAction<NoteProps[]>>;
		scores: ScoreProps[];
		setScores: React.Dispatch<React.SetStateAction<ScoreProps[]>>;
	},
);

export const MusicScoresProvider = ({ children }: { children: React.ReactNode }) => {
	const [scoreScroll, setScoreScroll] = useState(0);
	const [measureCount, setMeasureCount] = useState(0);
	const [notes, setNotes] = useState<NoteProps[]>([]);
	const [scores, setScores] = useState<ScoreProps[]>([
		{ beatCount: 4, beatSize: 64, lineCount: 6, measureCount: 3, notesSize: 32 },
	]);

	return (
		<GlobalContext.Provider
			value={{
				scoreScroll: scoreScroll,
				setScoreScroll: setScoreScroll,
				measureCount: measureCount,
				setMeasureCount: setMeasureCount,
				notes: notes,
				setNotes: setNotes,
				scores: scores,
				setScores: setScores,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

MusicScoresProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useScoresGlobal = () => useContext(GlobalContext);
