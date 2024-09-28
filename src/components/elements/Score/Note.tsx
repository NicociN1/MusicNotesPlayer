import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import styled from "@emotion/styled";
import { Delete, Palette } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { Dropdown, MenuProps } from "antd";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { Resizable } from "react-resizable";
import NoteContextMenu from "../ContextMenu/NoteContextMenu";

export interface NoteProps {
	noteSize: number;
	beatSize: number;
	beatCount: number;
	color: string;
	backgroundColor: string;
	x: number;
	y: number;
	label: string;
	scoreId: number;
	id: number;
}

const NoteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
	top: 0;
	left: 0;
	transition: 0.05s transform ease, 0.15s width ease-in, 0.15s height ease-in;
	width: 100%;
	height: 100%;
`;

const NoteContainer = styled.div`
  display: grid;
	width: calc(98%);
	height: calc(95%);
  grid-template-rows: 100%;
  position: relative;
	transition: 0.5s scale ease;
  &:hover, &:active {
		scale: 1.015;
  }
`;
const NoteBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  //border-radius: 3px; /* 角を丸める */
  box-shadow: 0 0 5px rgba(255, 255, 0, 0.5); /* 蛍光感を出すシャドウ */
	cursor: pointer;
`;

const Label = styled.div`
  background-color: transparent;
  height: 100%;
	width: 100%;
  position: absolute;
  font-weight: bold;
  display: flex;
  align-items: center;
	pointer-events: none;
`;

const Note = (props: NoteProps) => {
	//TODO 4/4拍ずつ配置できるようにする
	const { updateNote } = useScoresGlobal();
	const [isDragging, setIsDragging] = useState(false);

	const [position, setPosition] = useState<{ x: number; y: number }>({
		x: props.x * props.beatSize,
		y: props.y * props.noteSize,
	});

	const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
		setPosition({ x: data.x, y: data.y });
		updateNote(props.scoreId, {
			...props,
			x: Math.floor(position.x / props.beatSize),
			y: Math.ceil(position.y / props.noteSize),
		});
	};

	return (
		<Draggable
			grid={[props.beatSize / 4, props.noteSize]}
			position={position}
			onDrag={handleDrag}
			onStart={() => setIsDragging(true)}
			onStop={() => setIsDragging(false)}
			handle=".background"
			bounds=".staff-container"
		>
			<NoteWrapper
				style={{
					width: props.beatSize * props.beatCount + 2,
					height: props.noteSize,
				}}
			>
				<NoteContainer tabIndex={0}>
					<NoteContextMenu noteId={props.id} scoreId={props.scoreId}>
						<NoteBackground
							className="background"
							style={{
								backgroundColor: props.backgroundColor,
								boxShadow: isDragging ? "6px 6px 12px #00000088" : "",
							}}
						/>
					</NoteContextMenu>
					<Label
						style={{
							color: props.color,
							fontSize: `${props.noteSize * 0.6}px`,
							paddingLeft: `${props.noteSize * 0.25}px`,
						}}
					>
						{props.label}
					</Label>
				</NoteContainer>
			</NoteWrapper>
		</Draggable>
	);
};

export default Note;
