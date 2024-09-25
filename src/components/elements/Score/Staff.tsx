import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { NoteProps } from "./Note";

export interface StaffProps {
	beatCount: number;
	measureCount: number;
	lineCount: number;
}

const Staff = (props: StaffProps) => {
	const { setNotes, notes } = useScoresGlobal();

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
			background-color: #00bbff44;
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

	useEffect(() => {
		console.log("Staff", console.log(notes.map((x) => x.x)));
	});

	return (
		<StaffWrapper>
			{Array.from({ length: props.measureCount * props.lineCount }, (_v, index) => {
				const row = (index % props.measureCount) * props.beatCount;
				const column = Math.floor(index / props.measureCount);
				const note: NoteProps = {
					x: row,
					y: column,
					backgroundColor: "lime",
					beatCount: 4,
					beatSize: 64,
					color: "white",
					defaultLabel: "1",
					noteSize: 32,
				};
				return (
					<Line
						key="key"
						onClick={() =>
							setNotes((notes) => {
								const newNotes = notes;
								newNotes.push(note);
								console.log(notes);
								return [...newNotes];
							})
						}
					/>
				);
			})}
		</StaffWrapper>
	);
};

export default Staff;
