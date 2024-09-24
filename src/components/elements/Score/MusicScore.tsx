"use client";
import Grid from "@/components/elements/Score/Grid";
import { useMusicScores } from "@/hooks/MusicScoresGlobal";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import Tile from "./Tile";

const MusicScoreWrapper = styled.div`
  display: flex;
	flex-flow: column;
	width: 100%;
	height: 100%;
	overflow: scroll;
`;
const MusicScore = () => {
	const { scoreScroll } = useMusicScores();
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const wrapperCur = wrapperRef.current;
		if (!wrapperCur) return;
		wrapperCur.scrollTo({
			left: scoreScroll,
			behavior: "smooth",
		});
	}, [scoreScroll]);

	return (
		<MusicScoreWrapper>
			{/* <Grid
				tiles={Array.from({ length: 50 }, (i) => ({
					color: "lime",
					id: "B",
					defaultEnabled: false,
				}))}
			/>
			<Grid
				tiles={Array.from({ length: 50 }, (i) => ({
					color: "orange",
					id: "B",
					defaultEnabled: false,
				}))}
			/> */}
		</MusicScoreWrapper>
	);
};

export default MusicScore;
