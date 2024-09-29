import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import styles from "@/styles/ContextMenu.module.css";
import styled from "@emotion/styled";
import { Check, ChevronRight, Circle, Square } from "@mui/icons-material";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { ContextMenuRadioItem } from "@radix-ui/react-context-menu";
import { useState } from "react";
import LabelEditDialog from "../Dialog/LabelEditDialog";

const colorItems = [
	{
		label: "黒",
		value: "black",
		key: "1",
	},
	{
		label: "白",
		value: "white",
		key: "2",
	},
	{
		label: "グレー",
		value: "gray",
		key: "3",
	},
	{
		label: "緑",
		value: "green",
		key: "4",
	},
	{
		label: "赤",
		value: "red",
		key: "5",
	},
	{
		label: "黄色",
		value: "yellow",
		key: "6",
	},
	{
		label: "オレンジ",
		value: "orange",
		key: "7",
	},
	{
		label: "黄緑",
		value: "lime",
		key: "8",
	},
	{
		label: "紫",
		value: "purple",
		key: "9",
	},
];
const beatItems = [
	{
		label: "4 / 1 拍",
		value: 1,
		key: "1",
	},
	{
		label: "4 / 2 拍",
		value: 2,
		key: "2",
	},
	{
		label: "4 / 4 拍",
		value: 4,
		key: "3",
	},
	{
		label: "4 / 8 拍",
		value: 8,
		key: "4",
	},
	{
		label: "4 / 16 拍",
		value: 16,
		key: "5",
	},
];

interface ContextMenuProps {
	noteId: number;
	scoreId: number;
	children: React.ReactNode;
}

const NoteContextMenu = (props: ContextMenuProps) => {
	const { getNote, removeNote, updateNote, addNote, createNewId } = useScoresGlobal();

	const handleChangeColor = (color: string) => {
		const noteProps = getNote(props.scoreId, props.noteId);
		if (!noteProps) return;
		updateNote(props.scoreId, { ...noteProps, color: color });
	};
	const handleChangeBackgroundColor = (color: string) => {
		const noteProps = getNote(props.scoreId, props.noteId);
		console.log("getNote");
		if (!noteProps) return;
		console.log("updateNote");
		updateNote(props.scoreId, { ...noteProps, backgroundColor: color });
	};
	const handleEditLabel = () => {};
	const handleDuplicate = () => {
		const noteProps = getNote(props.scoreId, props.noteId);
		if (!noteProps) return;
		const newId = createNewId();
		console.log(noteProps.x);

		const newNote = {
			...noteProps,
			id: newId,
			x: noteProps.x + noteProps.beatSize,
			y: noteProps.y,
		};
		console.log(newNote);
		addNote(props.scoreId, newNote);
	};
	const handleChangeBeat = (beat: number) => {
		const noteProps = getNote(props.scoreId, props.noteId);
		if (!noteProps) return;
		updateNote(props.scoreId, { ...noteProps, beatCount: 4 / beat });
	};

	const noteProps = getNote(props.scoreId, props.noteId);
	const [color, setColor] = useState(noteProps?.color ?? "white");
	const [backgroundColor, setBackgroundColor] = useState(
		noteProps?.backgroundColor ?? "black",
	);
	const [beat, setBeat] = useState(
		noteProps ? (noteProps.beatCount * 4).toString() : "1",
	);
	const [dotted, setDotted] = useState(noteProps?.dotted ?? false);
	const [labelDialogOpen, setLabelDialogOpen] = useState(false);

	return (
		<>
			<LabelEditDialog
				open={labelDialogOpen}
				noteId={props.noteId}
				scoreId={props.scoreId}
				onOpenChange={(open) => {
					setLabelDialogOpen(open);
				}}
			/>
			<ContextMenu.Root>
				<ContextMenu.Trigger>{props.children}</ContextMenu.Trigger>
				<ContextMenu.Portal>
					<ContextMenu.Content className="radix-context-content">
						<ContextMenu.Item
							className="radix-context-item"
							onSelect={() => setLabelDialogOpen(true)}
						>
							テキストを編集
						</ContextMenu.Item>

						<ContextMenu.Sub>
							<ContextMenu.SubTrigger className="radix-context-subtrigger">
								拍の長さ
								<div className="radix-context-rightitem">
									<ChevronRight />
								</div>
							</ContextMenu.SubTrigger>
							<ContextMenu.Portal>
								<ContextMenu.SubContent className="radix-context-subcontent">
									<ContextMenu.RadioGroup
										value={beat}
										className="radix-context-radiogroup"
									>
										{beatItems.map((b) => (
											<ContextMenuRadioItem
												className="radix-context-radioitem"
												value={b.value.toString()}
												key={b.key}
												onClick={(e) => {
													e.preventDefault();
													handleChangeBeat(b.value);
													setBeat(b.value.toString());
												}}
											>
												{b.label}
												<ContextMenu.ItemIndicator className="radix-context-indicator">
													<Circle sx={{ fontSize: 8 }} />
												</ContextMenu.ItemIndicator>
											</ContextMenuRadioItem>
										))}
									</ContextMenu.RadioGroup>
								</ContextMenu.SubContent>
							</ContextMenu.Portal>
						</ContextMenu.Sub>

						<ContextMenu.CheckboxItem
							checked={dotted}
							onClick={(e) => {
								const newNote = getNote(props.scoreId, props.noteId);
								if (!newNote) return;
								updateNote(props.scoreId, { ...newNote, dotted: !dotted });
								setDotted(!dotted);
								e.preventDefault();
							}}
							className="radix-context-checkbox"
						>
							<ContextMenu.ItemIndicator className="radix-context-indicator">
								<Check fontSize="small" />
							</ContextMenu.ItemIndicator>
							付点
						</ContextMenu.CheckboxItem>

						<ContextMenu.Sub>
							<ContextMenu.SubTrigger className="radix-context-subtrigger">
								背景色
								<div className="radix-context-rightitem">
									<ChevronRight />
								</div>
							</ContextMenu.SubTrigger>
							<ContextMenu.Portal>
								<ContextMenu.SubContent className="radix-context-subcontent">
									<ContextMenu.RadioGroup
										value={backgroundColor}
										className="radix-context-radiogroup"
									>
										{colorItems.map((v) => (
											<ContextMenuRadioItem
												className="radix-context-radioitem"
												value={v.value}
												key={v.key}
												onClick={(e) => {
													e.preventDefault();
													handleChangeBackgroundColor(v.value);
													setBackgroundColor(v.value);
												}}
											>
												{v.label}
												<div
													className="radix-context-rightitem"
													style={{ color: v.value }}
												>
													<Square />
												</div>
												<ContextMenu.ItemIndicator className="radix-context-indicator">
													<Circle sx={{ fontSize: 8 }} />
												</ContextMenu.ItemIndicator>
											</ContextMenuRadioItem>
										))}
									</ContextMenu.RadioGroup>
								</ContextMenu.SubContent>
							</ContextMenu.Portal>
						</ContextMenu.Sub>

						<ContextMenu.Sub>
							<ContextMenu.SubTrigger className="radix-context-subtrigger">
								文字色
								<div className="radix-context-rightitem">
									<ChevronRight />
								</div>
							</ContextMenu.SubTrigger>
							<ContextMenu.Portal>
								<ContextMenu.SubContent className="radix-context-subcontent">
									<ContextMenu.RadioGroup
										value={color}
										className="radix-context-radiogroup"
									>
										{colorItems.map((v) => (
											<ContextMenuRadioItem
												className="radix-context-radioitem"
												value={v.value}
												key={v.key}
												onClick={(e) => {
													e.preventDefault();
													handleChangeColor(v.value);
													setColor(v.value);
												}}
											>
												{v.label}
												<div
													className="radix-context-rightitem"
													style={{ color: v.value }}
												>
													<Square />
												</div>
												<ContextMenu.ItemIndicator className="radix-context-indicator">
													<Circle sx={{ fontSize: 8 }} />
												</ContextMenu.ItemIndicator>
											</ContextMenuRadioItem>
										))}
									</ContextMenu.RadioGroup>
								</ContextMenu.SubContent>
							</ContextMenu.Portal>
						</ContextMenu.Sub>

						<ContextMenu.Separator className="radix-context-separator" />

						<ContextMenu.Item className="radix-context-item" onClick={handleDuplicate}>
							複製
						</ContextMenu.Item>

						<ContextMenu.Separator className="radix-context-separator" />

						<ContextMenu.Item
							className="radix-context-item"
							onClick={() => removeNote(props.scoreId, props.noteId)}
							style={{ color: "red" }}
						>
							削除
						</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu.Portal>
			</ContextMenu.Root>
		</>
	);
};

export default NoteContextMenu;
