"use client";
import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import styled from "@emotion/styled";
import Score from "./Score";

const MusicScoreWrapper = styled.div`
	width: 100%;
	min-height: 200%;
	position: relative;
`;
const MusicScore = () => {
	const { scores } = useScoresGlobal();

	return (
		<MusicScoreWrapper>
			{scores.map((s) => (
				<Score {...s} key={s.id} />
			))}
		</MusicScoreWrapper>
	);
};

export default MusicScore;
