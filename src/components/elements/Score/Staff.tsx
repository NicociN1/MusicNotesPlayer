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

const DurationLine = styled.div`
	height: 100%;
	border-left: solid 2px red;
	transition: 0.2s translate;
	position: absolute;
	top: 0;
	left: 0;
`;

const Staff = (props: StaffProps) => {
	const { createNewId: createId, addNote, getScore } = useScoresGlobal();

	const StaffWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(${props.measureCount}, 1fr);
    grid-template-rows: repeat(${props.lineCount}, 1fr);
    border-left: solid 4px black;
		width: 100%;
		height: 100%;
  `;
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

	return (
		<StaffWrapper>
			{Array.from({ length: props.measureCount * props.lineCount }, (_v, index) => {
				const row = (index % props.measureCount) * props.beatCount;
				const column = Math.floor(index / props.measureCount);
				return (
					<Line
						key={index}
						onClick={() => {
							console.log("onClick");
							let added = false;
							if (!added) {
								added = true;
								const note: NoteProps = {
									x: row,
									y: column,
									backgroundColor: "black",
									beatCount: 4,
									beatSize: 64,
									color: "white",
									label: "1",
									noteSize: 32,
									dotted: false,
									scoreId: -1,
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
