import styled from "@emotion/styled";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

export interface NoteProps {
	noteSize: number;
	beatSize: number;
	beatCount: number;
	color: string;
	backgroundColor: string;
	defaultLabel: string;
	x: number;
	y: number;
}

const NoteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
	top: 0;
	left: 0;
`;

const NoteContainer = styled.div`
  display: grid;
	width: calc(100% - 8px);
	height: calc(100% - 10px);
  grid-template-rows: 100%;
  position: relative;
  &:focus {
    outline: solid 3px gray;
  }
`;
const NoteBackground = styled.div`
  opacity: 0.5;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const StyledInput = styled.input`
  background-color: transparent;
  height: 100%;
  font-size: 1.15em;
  position: absolute;
  font-weight: bold;
  margin-left: 4px;
  text-shadow: 2px 2px 0 #00000088;
`;

const Note = (props: NoteProps) => {
	const position = useRef<{ x: number; y: number }>({
		x: props.x * props.beatSize,
		y: props.y * props.noteSize,
	});

	return (
		<Draggable grid={[props.beatSize / 4, props.noteSize]} position={position.current}>
			<NoteWrapper
				style={{
					width: props.beatSize * props.beatCount + 2,
					height: props.noteSize,
				}}
			>
				<NoteContainer tabIndex={0}>
					<NoteBackground
						style={{
							backgroundColor: props.backgroundColor,
						}}
					/>
					<StyledInput
						defaultValue={props.defaultLabel}
						style={{
							color: props.color,
							width: `${props.noteSize * 1.2}px`,
						}}
					/>
				</NoteContainer>
			</NoteWrapper>
		</Draggable>
	);
};

export default Note;
