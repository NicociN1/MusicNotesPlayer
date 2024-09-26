"use client";
import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import Score from "./Score";

const MusicScoreWrapper = styled.div`
	width: 100%;
	height: 100%;
	overflow: scroll;
	position: relative;
`;
const MusicScore = () => {
	const { scores, setScores } = useScoresGlobal();

	return (
		<MusicScoreWrapper>
			{scores.map((s) => (
				<Score {...s} key={s.id} />
			))}
		</MusicScoreWrapper>
	);
};

export default MusicScore;
