"use client";
import { NoteProps } from "@/components/elements/Score/Note";
import { ScoreProps } from "@/components/elements/Score/Score";
import { download, upload } from "@/utils/fileManager";
import PropTypes from "prop-types";
import React, { createContext, useContext, useRef, useState } from "react";
import { useYouTubeGlobal } from "./YouTubeGlobal";

let currentId = 0;
const createNewId = () => currentId++;

const GlobalContext = createContext(
	{} as {
		measureCount: number;
		setMeasureCount: React.Dispatch<React.SetStateAction<number>>;
		createNewId: () => number;
		addNote: (scoreId: number, noteProps: NoteProps) => void;
		getNote: (scoreId: number, id: number) => NoteProps | undefined;
		removeNote: (scoreId: number, id: number) => void;
		updateNote: (scoreId: number, noteProps: NoteProps) => void;
		duplicateNote: (scoreId: number, noteId: number) => void;
		scores: ScoreProps[];
		setScores: React.Dispatch<React.SetStateAction<ScoreProps[]>>;
		addScore: (scoreProps: ScoreProps) => void;
		getScore: (id: number) => ScoreProps | undefined;
		removeScore: (id: number) => void;
		updateScore: (scoreProps: ScoreProps) => void;
		updateMainScore: (scoreId: number | null) => void;
		getMainScore: () => ScoreProps | null;
		setMusicSettings: (saveData: MusicSettings) => void;
		musicSettings: MusicSettings;
		jsonImport: () => void;
		jsonExport: (fileName: string) => void;
		lineRef: React.MutableRefObject<HTMLDivElement | null>;
	},
);

export interface MusicSettings {
	bpm: number;
	youtubeUrl: string;
	startTime: number;
	showVerticalLine: boolean;
}

export const MusicScoresProvider = ({ children }: { children: React.ReactNode }) => {
	const [measureCount, setMeasureCount] = useState(0);
	const [scores, setScores] = useState<ScoreProps[]>([]);
	const [musicSettings, setMusicSettings] = useState<MusicSettings>({
		bpm: 106,
		youtubeUrl: "https://youtube.com/watch?v=0xSiBpUdW4E",
		startTime: 2.5,
		showVerticalLine: true,
	});
	const lineRef = useRef<HTMLDivElement | null>(null);

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
			if (scoreIndex === -1) return scores;
			const newNotes = [...scores[scoreIndex].notes];
			const updatedNotes = newNotes.map((n) => (n.id === noteProps.id ? noteProps : n));
			newScores[scoreIndex].notes = updatedNotes;
			return newScores;
		});
	};
	const getNote = (scoreId: number, id: number) => {
		const score = scores.find((s) => s.id === scoreId);
		if (!score) return;
		const noteProps = score.notes.find((n) => n.id === id);
		return noteProps;
	};
	const removeNote = (scoreId: number, id: number) => {
		setScores((scores) => {
			const newScores = [...scores];
			const scoreIndex = scores.findIndex((s) => s.id === scoreId);
			if (scoreIndex === -1) return scores;
			const newNotes = newScores[scoreIndex].notes;
			const updatedNotes = newNotes.filter((n) => n.id !== id);
			newScores[scoreIndex].notes = updatedNotes;
			return newScores;
		});
	};
	const duplicateNote = (scoreId: number, noteId: number) => {
		const noteProps = getNote(scoreId, noteId);
		if (!noteProps) return;
		const newId = createNewId();

		const newNote = {
			...noteProps,
			id: newId,
			x: noteProps.x + noteProps.beatSize * noteProps.beatCount,
			y: noteProps.y,
		};
		addNote(scoreId, newNote);
	};

	const addScore = (scoreProps: ScoreProps) => {
		setScores((scores) => {
			if (scores.find((n) => n.id === scoreProps.id)) {
				return scores;
			}
			const newScores = [...scores];
			newScores.push(scoreProps);
			return newScores;
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
	const updateMainScore = (id: number | null) => {
		setScores((scores) => {
			const newScores = scores.map((s) => ({
				...s,
				mainScore: id != null ? s.id === id : false,
			}));
			return newScores;
		});
	};
	const getMainScore = () => {
		return scores.find((s) => s.mainScore) ?? null;
	};

	const jsonImport = () => {
		upload()
			.then((data) => {
				const importData = JSON.parse(data) as {
					scores: ScoreProps[];
					settings: MusicSettings;
				};
				if (!importData.scores || !importData.settings) return;
				setScores([]);
				setTimeout(() => {
					const newScore = importData.scores.map((s) => ({
						...s,
						notes: s.notes.map((n) => ({
							...n,
							fontScaleFactor: n.fontScaleFactor ?? 1,
						})),
					}));
					setScores(newScore);
					setMusicSettings(importData.settings);
					const highestId = Math.max(
						...importData.scores.flatMap((s) => s.notes).map((n) => n.id),
					);
					currentId = highestId + 1;
				}, 1);
			})
			.catch((e) => console.error(e));
	};
	const jsonExport = (fileName: string) => {
		download(
			JSON.stringify({ scores: scores, settings: musicSettings }),
			`MusicNotes ${fileName}.json`,
			"application/json",
		);
	};

	return (
		<GlobalContext.Provider
			value={{
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
				duplicateNote: duplicateNote,
				updateMainScore: updateMainScore,
				getMainScore: getMainScore,
				setMusicSettings: setMusicSettings,
				musicSettings: musicSettings,
				jsonImport: jsonImport,
				jsonExport: jsonExport,
				lineRef: lineRef,
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
