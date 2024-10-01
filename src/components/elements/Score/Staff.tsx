import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import { useYouTubeGlobal } from "@/hooks/YouTubeGlobal";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { NoteProps } from "./Note";

export interface StaffProps {
	beatCount: number;
	measureCount: number;
	lineCount: number;
	scoreId: number;
}

const Line = styled.div`
	border-right: solid 4px black;
	&:hover {
		background-color: #00000022;
	}
	&::before {
		content: "";
		display: block;
		width: 100%;
		position: relative;
		top: 50%;
		border-top: solid 2px black;
	}
`;
const VerticalLine = styled.div`
	background-color: red;
	height: 100%;
	width: 2px;
	position: absolute;
	left: 0;
	transition: 0.3s left;
	z-index: 1;
`;

const Staff = (props: StaffProps) => {
	const { createNewId: createId, addNote, getScore, lineRef } = useScoresGlobal();

	const StaffWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${props.measureCount}, 1fr);
    grid-template-rows: repeat(${props.lineCount}, 1fr);
    border-left: solid 4px black;
		width: 100%;
		height: 100%;
  `;

	return (
		<StaffWrapper>
			{getScore(props.scoreId)?.mainScore ? <VerticalLine ref={lineRef} /> : null}
			{Array.from({ length: props.measureCount * props.lineCount }, (_v, index) => {
				const row = (index % props.measureCount) * props.beatCount;
				const column = Math.floor(index / props.measureCount);
				return (
					<Line
						key={index}
						onClick={() => {
							let added = false;
							if (!added) {
								added = true;
								const scoreProps = getScore(props.scoreId);
								if (!scoreProps) return;
								const note: NoteProps = {
									x: row * scoreProps.beatSize,
									y: column * scoreProps.notesSize,
									backgroundColor: "black",
									beatCount: scoreProps.beatCount,
									beatSize: scoreProps.beatSize,
									color: "white",
									label: "0",
									noteSize: scoreProps.notesSize,
									dotted: false,
									scoreId: -1,
									fontScaleFactor: 1,
									id: createId(),
								};
								addNote(props.scoreId, note);
							}
						}}
					/>
				);
			})}
		</StaffWrapper>
	);
};

export default Staff;
