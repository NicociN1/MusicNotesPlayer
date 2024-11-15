import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import { useYouTubeGlobal } from "@/hooks/YouTubeGlobal";
import styled from "@emotion/styled";
import { Settings } from "@mui/icons-material";
import { useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import ScoreEditDialog from "../Dialog/ScoreEditDialog";
import Note, { NoteProps } from "./Note";
import Staff from "./Staff";

const DraggableWrapper = styled.div`
	border: solid 1px lightgrey;
	border-radius: 8px;
	position: absolute;
	display: grid;
	grid-template-columns: 32px 1fr 32px;
	grid-template-rows: 20px 32px 1fr 32px;
`;
const ScoreContainer = styled.div`
	display: grid;
	grid-row: 3;
	grid-column: 2;
`;
const LabelWrapper = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
`;
const DragHandleBar = styled.div`
	border-bottom: solid 1px lightgray;
	background-color: #ccccc344;
	width: 100%;
	height: 100%;
	grid-row: 1;
	grid-column: 1 / 4;
	cursor: grab;
	&:active {
		cursor: grabbing;
	}
`;
const StyledInput = styled.input`
	width: 100%;
	height: 100%;
	background-color: transparent;
	text-align: center;
	grid-column: 1;
	outline: none;
	border: solid 1px lightgrey;
	border-radius: 4px;
`;
const StaffContainer = styled.div`
	transition: 0.5s width ease, 0.5s height ease;
`;
const SettingsButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	grid-row: 4;
	grid-column: 1;
`;

export interface ScoreProps {
	beatCount: number;
	measureCount: number;
	lineCount: number;
	beatSize: number;
	notesSize: number;
	notes: NoteProps[];
	x: number;
	y: number;
	stringLabels: { stringIndex: number; label: string }[];
	mainScore: boolean;
	id: number;
}

const Score = (props: ScoreProps) => {
	const [isDragging, setDragging] = useState<boolean>(false);
	const [scoreDialogOpen, setScoreDialogOpen] = useState(false);
	const { updateScore } = useScoresGlobal();
	const handleDragStop = (_e: DraggableEvent, data: DraggableData) => {
		setDragging(false);
		updateScore({
			...props,
			x: data.x,
			y: data.y,
		});
	};

	return (
		<>
			<ScoreEditDialog
				isEditor={true}
				open={scoreDialogOpen}
				onOpenChange={(open) => {
					setScoreDialogOpen(open);
				}}
				scoreId={props.id}
			/>
			<Draggable
				handle=".drag-handle"
				onStart={() => setDragging(true)}
				onStop={handleDragStop}
				bounds={{ left: 0, top: 0 }}
				position={{ x: props.x, y: props.y }}
			>
				<DraggableWrapper
					style={{
						boxShadow: `0 0 ${!isDragging ? 6 : 16}px #00000088`,
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
								<StyledInput
									type="text"
									key={i}
									defaultValue={
										props.stringLabels.find((v) => v.stringIndex === i)?.label
									}
									onChange={(e) => {
										const newProps = { ...props };
										const index = newProps.stringLabels.findIndex(
											(x) => x.stringIndex === i,
										);
										const stringLabel = {
											stringIndex: i,
											label: e.target.value,
										};
										if (index !== -1) {
											newProps.stringLabels[index] = stringLabel;
										} else {
											newProps.stringLabels.push(stringLabel);
										}
										updateScore(newProps);
									}}
									style={{
										fontSize: `${props.notesSize * 0.7}px`,
									}}
								/>
							))}
						</LabelWrapper>
						<StaffContainer
							className="staff-container"
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
								scoreId={props.id}
							/>
							{props.notes.map((n) => (
								<Note
									{...n}
									noteSize={props.notesSize}
									beatSize={props.beatSize}
									key={n.id}
								/>
							))}
						</StaffContainer>
					</ScoreContainer>
					<SettingsButton
						onClick={() => {
							setScoreDialogOpen(true);
						}}
					>
						<Settings htmlColor="gray" sx={{ fontSize: "2em" }} />
					</SettingsButton>
				</DraggableWrapper>
			</Draggable>
		</>
	);
};

export default Score;
