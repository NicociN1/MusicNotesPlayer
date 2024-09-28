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
	dotted: boolean;
	scoreId: number;
	// dotted: boolean;
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
	width: calc(100% - 6px);
	height: calc(85%);
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
	border-radius: 99px;
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
	const { updateNote, getNote } = useScoresGlobal();
	const [isDragging, setIsDragging] = useState(false);

	const [position, setPosition] = useState<{ x: number; y: number }>({
		x: props.x,
		y: props.y,
	});

	const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
		setPosition({ x: data.x, y: data.y });
		updateNote(props.scoreId, {
			...props,
			x: data.x,
			y: data.y,
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
					width: props.beatSize * props.beatCount * (props.dotted ? 1.5 : 1) + 2,
					height: props.noteSize,
				}}
			>
				<NoteContainer tabIndex={0}>
					<NoteContextMenu noteId={props.id} scoreId={props.scoreId}>
						<NoteBackground
							className="background"
							style={{
								backgroundColor: props.backgroundColor,
								boxShadow: isDragging
									? "4px 4px 8px 2px #00000088"
									: // : "2px 2px 8px #00000088",
										"",
							}}
						/>
					</NoteContextMenu>
					<Label
						style={{
							color: props.color,
							fontSize: `${props.noteSize * 0.7}px`,
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
