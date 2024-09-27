import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import * as Dialog from "@radix-ui/react-dialog";
import { Input, InputNumber } from "antd";
import { useRef } from "react";
import { ScoreProps } from "../Score/Score";

const DMEASURECOUNT = 4;
const DLINECOUNT = 6;
const DBEATCOUNT = 4;
const DMEASURESIZE = 512;
const DNOTESSIZE = 32;

interface ScoreEditDialogProps {
	open: boolean;
	scoreId: number;
	isEditor: boolean;
	onOpenChange: (open: boolean) => void;
}

const ScoreEditDialog = (props: ScoreEditDialogProps) => {
	const { getScore, updateScore, addScore, createNewId, removeScore } = useScoresGlobal();
	const scoreProps = getScore(props.scoreId);
	const measureCountValueRef = useRef<number | null>(null);
	const lineCountValueRef = useRef<number | null>(null);
	const beatCountValueRef = useRef<number | null>(null);
	const measureSizeValueRef = useRef<number | null>(null);
	const notesSizeValueRef = useRef<number | null>(null);

	return (
		<Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="radix-dialog-overlay" />

				<Dialog.Content className="radix-dialog-content">
					<Dialog.Title className="radix-dialog-title">楽譜設定</Dialog.Title>

					<div className="radix-dialog-inputgroup">
						小節の数
						<InputNumber
							defaultValue={scoreProps?.measureCount ?? DMEASURECOUNT}
							onChange={(v) => {
								measureCountValueRef.current = v;
							}}
							style={{ width: "100%" }}
						/>
						線の数
						<InputNumber
							defaultValue={scoreProps?.lineCount ?? DLINECOUNT}
							onChange={(v) => {
								lineCountValueRef.current = v;
							}}
							style={{ width: "100%" }}
						/>
						1小節の拍数
						<InputNumber
							defaultValue={scoreProps?.beatCount ?? DBEATCOUNT}
							onChange={(v) => {
								beatCountValueRef.current = v;
							}}
							style={{ width: "100%" }}
						/>
						1小節のサイズ
						<InputNumber
							defaultValue={
								scoreProps ? scoreProps.beatSize * scoreProps.beatCount : DMEASURESIZE
							}
							onChange={(v) => {
								measureSizeValueRef.current = v;
							}}
							style={{ width: "100%" }}
						/>
						音符のサイズ
						<InputNumber
							defaultValue={scoreProps?.notesSize ?? DNOTESSIZE}
							onChange={(v) => {
								notesSizeValueRef.current = v;
							}}
							style={{ width: "100%" }}
						/>
					</div>

					<div className="radix-dialog-actiongroup">
						<button
							type="button"
							className="radix-dialog-action-right"
							onClick={() => {
								const newScoreProps = {} as ScoreProps;
								newScoreProps.beatCount = beatCountValueRef.current ?? DBEATCOUNT;
								newScoreProps.beatSize =
									(measureSizeValueRef.current ?? DMEASURESIZE) /
									(beatCountValueRef.current ?? DBEATCOUNT);
								newScoreProps.lineCount = lineCountValueRef.current ?? DLINECOUNT;
								newScoreProps.measureCount =
									measureCountValueRef.current ?? DMEASURECOUNT;
								newScoreProps.notesSize = notesSizeValueRef.current ?? DNOTESSIZE;

								if (props.isEditor) {
									if (!scoreProps) return;
									updateScore({ ...scoreProps, ...newScoreProps });
								} else {
									addScore({
										...newScoreProps,
										notes: [],
										x: 0,
										y: 0,
										stringLabels: [],
										id: createNewId(),
									});
								}

								props.onOpenChange(false);
							}}
						>
							{props.isEditor ? "保存" : "作成"}
						</button>
						{props.isEditor ? (
							<button
								type="button"
								className="radix-dialog-action-center"
								style={{ color: "red" }}
								onClick={() => {
									removeScore(props.scoreId);
									props.onOpenChange(false);
								}}
							>
								削除
							</button>
						) : null}
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

export default ScoreEditDialog;
