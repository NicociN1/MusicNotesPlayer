import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import { TextField } from "@mui/material";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "antd";
import { useRef, useState } from "react";

interface LabelEditDialogProps {
	open: boolean;
	noteId: number;
	scoreId: number;
	onOpenChange: (open: boolean) => void;
}

const LabelEditDialog = (props: LabelEditDialogProps) => {
	const { getNote, updateNote } = useScoresGlobal();
	const labelValueRef = useRef("");

	const handleChangeLabel = () => {
		const note = getNote(props.scoreId, props.noteId);
		if (!note) return;
		note.label = labelValueRef.current;
		updateNote(props.scoreId, note);
	};

	return (
		<Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="radix-dialog-overlay" />

				<Dialog.Content className="radix-dialog-content">
					<Dialog.Title className="radix-dialog-title">テキストを編集</Dialog.Title>
					<Input
						className="radix-dialog-textfield"
						placeholder="Text"
						defaultValue={getNote(props.scoreId, props.noteId)?.label ?? ""}
						onChange={(ev) => {
							labelValueRef.current = ev.target.value;
						}}
					/>

					<div className="radix-dialog-actiongroup">
						<button
							type="button"
							className="radix-dialog-action-right"
							onClick={() => {
								props.onOpenChange(false);
								handleChangeLabel();
							}}
						>
							決定
						</button>
						<button
							type="button"
							className="radix-dialog-action-left"
							onClick={() => props.onOpenChange(false)}
						>
							キャンセル
						</button>
					</div>

					<Dialog.Close asChild>
						<button type="button" className="radix-dialog-close-button">
							×
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default LabelEditDialog;
