import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import styled from "@emotion/styled";
import { DragHandle, DragIndicator, PanTool } from "@mui/icons-material";
import { Input } from "antd";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import Note, { NoteProps } from "./Note";
import Staff, { StaffProps } from "./Staff";

const DraggableWrapper = styled.div`
	border: solid 1px lightgrey;
	/* border-radius: 4px; */
	position: absolute;
`;
const ScoreContainer = styled.div`
	display: grid;
	padding: 16px;
`;
const LabelWrapper = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
`;
const DragHandleBar = styled.div`
	border-bottom: solid 1px lightgray;
	background-color: #d3d3d344;
	cursor: move;
	width: 100%;
	height: 16px;
`;
const StyledInput = styled.input`
	width: 100%;
	height: 100%;
	background-color: transparent;
	text-align: center;
	font-size: 1.1em;
	grid-column: 1;
	outline: none;
	border: solid 1px lightgrey;
	border-radius: 4px;
`;

export interface ScoreProps {
	beatCount: number;
	measureCount: number;
	lineCount: number;
	beatSize: number;
	notesSize: number;
}

const Score = (props: ScoreProps) => {
	const [isDragging, setDragging] = useState<boolean>(false);
	const { notes, setNotes } = useScoresGlobal();

	useEffect(() => {
		console.log("Score", console.log(notes.map((x) => x.x)));
	});

	return (
		<Draggable
			handle=".drag-handle"
			onStart={() => setDragging(true)}
			onStop={() => setDragging(false)}
			bounds={{ left: 0, top: 0 }}
		>
			<DraggableWrapper
				style={{
					boxShadow: `0 0 ${isDragging ? 20 : 8}px #00000088`,
					backgroundColor: isDragging ? "#ffffff88" : "white",
					zIndex: isDragging ? 1 : 0,
				}}
			>
				<DragHandleBar className="drag-handle" />
				<ScoreContainer
					style={{
						gridTemplateColumns: `${props.notesSize}px ${props.beatSize * props.beatCount * props.measureCount}px`,
						gridTemplateRows: `repeat(${props.lineCount}, ${props.notesSize}px)`,
					}}
				>
					<LabelWrapper
						style={{
							width: props.notesSize,
							minWidth: props.notesSize,
							height: props.lineCount * props.notesSize,
						}}
					>
						{Array.from({ length: props.lineCount }, (_v, i) => (
							<StyledInput type="text" key="key" />
						))}
					</LabelWrapper>
					<div
						style={{
							width: props.beatSize * props.beatCount * props.measureCount,
							height: props.notesSize * props.lineCount,
							position: "relative",
						}}
					>
						<Staff
							beatCount={props.beatCount}
							lineCount={props.lineCount}
							measureCount={props.measureCount}
						/>
						{notes.map((n) => (
							<Note
								{...n}
								noteSize={props.notesSize}
								beatSize={props.beatSize}
								key="key"
							/>
						))}
					</div>
				</ScoreContainer>
			</DraggableWrapper>
		</Draggable>
	);
};

export default Score;
