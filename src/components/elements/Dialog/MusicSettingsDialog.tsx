import { MusicSettings, useScoresGlobal } from "@/hooks/ScoresGlobal";
import * as Dialog from "@radix-ui/react-dialog";
import { Checkbox, Input, InputNumber } from "antd";
import { useEffect, useRef } from "react";
import { ScoreProps } from "../Score/Score";

interface MusicSettingsDialog {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const MusicSettingsDialog = (props: MusicSettingsDialog) => {
	const { musicSettings: saveData, setMusicSettings: setSaveData } = useScoresGlobal();
	const bpmValueRef = useRef<number>(saveData.bpm);
	const youtubeUrlValueRef = useRef<string>(saveData.youtubeUrl);
	const startTimeValueRef = useRef<number>(saveData.startTime);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (props.open) {
			bpmValueRef.current = saveData.bpm;
			youtubeUrlValueRef.current = saveData.youtubeUrl;
			startTimeValueRef.current = saveData.startTime;
		}
	}, [props.open]);

	const handleClose = () => {
		props.onOpenChange(false);
	};

	return (
		<Dialog.Root
			open={props.open}
			onOpenChange={(open) => {
				props.onOpenChange(open);
			}}
		>
			<Dialog.Portal>
				<Dialog.Overlay className="radix-dialog-overlay" />

				<Dialog.Content className="radix-dialog-content">
					<Dialog.Title className="radix-dialog-title">曲設定</Dialog.Title>

					<div className="radix-dialog-inputgroup">
						BPM
						<InputNumber
							defaultValue={saveData.bpm}
							onChange={(v) => {
								if (!v) return;
								bpmValueRef.current = v;
							}}
							style={{ width: "100%" }}
							step={1}
						/>
						YouTubeURL
						<Input
							defaultValue={saveData.youtubeUrl}
							onChange={(v) => {
								if (!v) return;
								youtubeUrlValueRef.current = v.target.value;
							}}
							style={{ width: "100%" }}
						/>
						開始までの時間
						<InputNumber
							defaultValue={saveData.startTime}
							onChange={(v) => {
								if (!v) return;
								startTimeValueRef.current = v;
							}}
							style={{ width: "100%" }}
							min={0}
						/>
					</div>

					<div className="radix-dialog-actiongroup">
						<button
							type="button"
							className="radix-dialog-action-right"
							onClick={() => {
								const newSaveData = {} as MusicSettings;
								newSaveData.bpm = bpmValueRef.current;
								newSaveData.youtubeUrl = youtubeUrlValueRef.current;
								newSaveData.startTime = startTimeValueRef.current;

								setSaveData(newSaveData);
								handleClose();
							}}
						>
							保存
						</button>
						<button
							type="button"
							className="radix-dialog-action-left"
							onClick={() => handleClose()}
						>
							キャンセル
						</button>
					</div>

					<Dialog.Close asChild>
						<button
							onClick={() => handleClose()}
							type="button"
							className="radix-dialog-close-button"
						>
							×
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default MusicSettingsDialog;
