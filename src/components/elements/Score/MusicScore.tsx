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
			{scores.map((s, index) => (
				<Score {...s} key={index} />
			))}
		</MusicScoreWrapper>
	);
};

export default MusicScore;
