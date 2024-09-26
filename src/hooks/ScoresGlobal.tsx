"use client";
import { NoteProps } from "@/components/elements/Score/Note";
import { ScoreProps } from "@/components/elements/Score/Score";
import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const createNewId = (() => {
	let currentId = 0;
	return () => currentId++;
})();

const GlobalContext = createContext(
	{} as {
		scoreScroll: number;
		setScoreScroll: React.Dispatch<React.SetStateAction<number>>;
		measureCount: number;
		setMeasureCount: React.Dispatch<React.SetStateAction<number>>;
		createNewId: () => number;
		addNote: (scoreId: number, noteProps: NoteProps) => void;
		getNote: (scoreId: number, id: number) => NoteProps | undefined;
		removeNote: (scoreId: number, id: number) => void;
		updateNote: (scoreId: number, noteProps: NoteProps) => void;
		scores: ScoreProps[];
		setScores: React.Dispatch<React.SetStateAction<ScoreProps[]>>;
		addScore: (scoreProps: ScoreProps) => void;
		getScore: (id: number) => ScoreProps | undefined;
		removeScore: (id: number) => void;
		updateScore: (scoreProps: ScoreProps) => void;
	},
);

export const MusicScoresProvider = ({ children }: { children: React.ReactNode }) => {
	const [scoreScroll, setScoreScroll] = useState(0);
	const [measureCount, setMeasureCount] = useState(0);
	const [scores, setScores] = useState<ScoreProps[]>([
		{
			beatCount: 4,
			beatSize: 256,
			lineCount: 6,
			measureCount: 3,
			notesSize: 40,
			notes: [],
			id: createNewId(),
		},
	]);

	const addNote = (scoreId: number, noteProps: NoteProps) => {
		let added = false;
		setScores((scores) => {
			if (added) return scores;
			added = true;
			const newScores = [...scores];
			const scoreIndex = scores.findIndex((s) => s.id === scoreId);
			if (scoreIndex === -1) return scores;
			const newNotes = [...scores[scoreIndex].notes];
			newNotes.push({ ...noteProps, scoreId: scoreId });
			newScores[scoreIndex].notes = newNotes;
			return newScores;
		});
	};
	const updateNote = (scoreId: number, noteProps: NoteProps) => {
		setScores((scores) => {
			const newScores = [...scores];
			const scoreIndex = scores.findIndex((s) => s.id === scoreId);
			console.log("debug", scoreId, scoreIndex, scores[scoreIndex]);
			if (scoreIndex === -1) return scores;
			const newNotes = [...scores[scoreIndex].notes];
			const updatedNotes = newNotes.map((n) => (n.id === noteProps.id ? noteProps : n));
			newScores[scoreIndex].notes = updatedNotes;
			return newScores;
		});
	};
	const getNote = (scoreId: number, id: number) => {
		console.log(scoreId, id);
		const score = scores.find((s) => s.id === scoreId);
		console.log(scoreId, scores);
		if (!score) return;
		const noteProps = score.notes.find((n) => n.id === id);
		console.log(noteProps);
		return noteProps;
	};
	const removeNote = (scoreId: number, id: number) => {
		setScores((scores) => {
			const newScores = [...scores];
			const scoreIndex = scores.findIndex((s) => s.id === scoreId);
			console.log(scoreId, id, scoreIndex);
			if (scoreIndex === -1) return scores;
			const newNotes = newScores[scoreIndex].notes;
			const updatedNotes = newNotes.filter((n) => n.id !== id);
			newScores[scoreIndex].notes = updatedNotes;
			console.log(newScores);
			return newScores;
		});
	};

	const addScore = (scoreProps: ScoreProps) => {
		setScores((scores) => {
			if (scores.find((n) => n.id === scoreProps.id)) {
				return scores;
			}
			const newScores = [...scores];
			newScores.push(scoreProps);
			return [...newScores];
		});
	};
	const updateScore = (scoreProps: ScoreProps) => {
		setScores((scores) => {
			const newScores = scores.map((n) => {
				if (n.id !== scoreProps.id) return n;
				return scoreProps;
			});
			return newScores;
		});
	};
	const getScore = (id: number) => {
		const scoreProps = scores.find((n) => n.id === id);
		if (scoreProps) {
			return scoreProps;
		}
		return undefined;
	};
	const removeScore = (id: number) => {
		setScores((scores) => {
			const newScores = [...scores];
			const filteredScores = newScores.filter((n) => n.id !== id);
			return [...filteredScores];
		});
	};

	return (
		<GlobalContext.Provider
			value={{
				scoreScroll: scoreScroll,
				setScoreScroll: setScoreScroll,
				measureCount: measureCount,
				setMeasureCount: setMeasureCount,
				createNewId: createNewId,
				addNote: addNote,
				getNote: getNote,
				updateNote: updateNote,
				removeNote: removeNote,
				scores: scores,
				setScores: setScores,
				addScore: addScore,
				updateScore: updateScore,
				getScore: getScore,
				removeScore: removeScore,
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
