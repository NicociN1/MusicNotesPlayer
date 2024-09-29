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
import { NoteSvg } from "./NoteSvg";

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
	fontScaleFactor: number;
	scoreId: number;
	// dotted: boolean;
	id: number;
}

const NoteWrapper = styled.div`
  position: absolute;
	top: 0;
	left: 0;
	transition: 0.05s transform ease, 0.1s width;;
	width: 100%;
	height: 100%;
	cursor: pointer;
`;

const NoteContainer = styled.div`
	width: 100%;
	height: 100%;
  position: absolute;
	transition: 0.5s scale ease;
	display: flex;
	justify-content: center;
	align-items: center;
  &:hover, &:active {
		scale: 1.015;
  }
	/* &:focus {
		scale: 1.04;
	} */
`;

const Label = styled.div`
  background-color: transparent;
  height: 100%;
	width: 100%;
  position: absolute;
	top: 0;
  font-weight: bold;
  display: flex;
  align-items: center;
	pointer-events: none;
`;

const Note = (props: NoteProps) => {
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

	const NoteBackground = styled.div`
		width: calc(100% - 6px);
		height: calc(100% - 6px);
		position: absolute;
		border-radius: 99px;
		display: flex;
		cursor: pointer;
		transition: 0.1s background-color;
		overflow: hidden;
		&::before {
			content: "";
			width: 100%;
			height: 50%;
			background-color: color-mix(in srgb, ${props.backgroundColor}, white 10%);
		}
	`;

	return (
		<Draggable
			grid={[props.beatSize / 4, props.noteSize]}
			position={position}
			onDrag={handleDrag}
			onStart={() => setIsDragging(true)}
			onStop={() => setIsDragging(false)}
			handle=".container"
			bounds=".staff-container"
		>
			<NoteWrapper
				style={{
					width: props.beatSize * props.beatCount * (props.dotted ? 1.5 : 1) + 2,
					height: props.noteSize,
				}}
			>
				<NoteContextMenu noteId={props.id} scoreId={props.scoreId}>
					<NoteContainer
						className="container"
						tabIndex={0}
						style={{
							opacity: isDragging ? 0.7 : 1,
							zIndex: isDragging ? 10 : 0,
						}}
					>
						<NoteBackground
							style={{
								backgroundColor: props.backgroundColor,
								boxShadow: isDragging
									? "4px 4px 6px #00000088"
									: // : "2px 2px 8px #00000088",
										"",
							}}
						/>
						<Label
							style={{
								color: props.color,
								fontSize: `${props.noteSize * 0.7 * props.fontScaleFactor}px`,
								left: `${props.noteSize * 0.3}px`,
							}}
						>
							{props.label}
						</Label>
					</NoteContainer>
				</NoteContextMenu>
			</NoteWrapper>
		</Draggable>
	);
};

export default Note;
