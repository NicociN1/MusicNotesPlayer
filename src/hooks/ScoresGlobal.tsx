"use client";
import { NoteProps } from "@/components/elements/Score/Note";
import { ScoreProps } from "@/components/elements/Score/Score";
import PropTypes from "prop-types";
import React, {
	createContext,
	RefObject,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

const createNewId = (() => {
	let currentId = 0;
	return () => currentId++;
})();

const GlobalContext = createContext(
	{} as {
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
		updateMainScore: (scoreId: number | null) => void;
		getMainScore: () => ScoreProps | null;
		setMusicSettings: (saveData: SaveData) => void;
		musicSettings: SaveData;
	},
);

export interface SaveData {
	bpm: number;
	youtubeUrl: string;
	startTime: number;
}

export const MusicScoresProvider = ({ children }: { children: React.ReactNode }) => {
	const [measureCount, setMeasureCount] = useState(0);
	const [scores, setScores] = useState<ScoreProps[]>([]);
	const [musicSettings, setMusicSettings] = useState<SaveData>({
		bpm: 106,
		youtubeUrl: "https://youtu.be/0xSiBpUdW4E",
		startTime: 2.5,
	});

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
				updateMainScore: updateMainScore,
				getMainScore: getMainScore,
				setMusicSettings: setMusicSettings,
				musicSettings: musicSettings,
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
