import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import * as Dialog from "@radix-ui/react-dialog";
import { Checkbox, Input, InputNumber } from "antd";
import { useRef } from "react";
import { ScoreProps } from "../Score/Score";

const DMEASURECOUNT = 4;
const DLINECOUNT = 6;
const DBEATCOUNT = 4;
const DMEASURESIZE = 512;
const DNOTESSIZE = 32;
const DMAINSCORE = false;

interface ScoreEditDialogProps {
	open: boolean;
	scoreId: number;
	isEditor: boolean;
	onOpenChange: (open: boolean) => void;
}

const ScoreEditDialog = (props: ScoreEditDialogProps) => {
	const { getScore, updateScore, addScore, createNewId, removeScore, updateMainScore } =
		useScoresGlobal();
	const scoreProps = props.isEditor ? getScore(props.scoreId) : undefined;
	const measureCountValueRef = useRef<number>(
		props.isEditor ? (scoreProps?.measureCount ?? DMEASURECOUNT) : DMEASURECOUNT,
	);
	const lineCountValueRef = useRef<number>(
		props.isEditor ? (scoreProps?.lineCount ?? DLINECOUNT) : DLINECOUNT,
	);
	const beatCountValueRef = useRef<number>(
		props.isEditor ? (scoreProps?.beatCount ?? DBEATCOUNT) : DBEATCOUNT,
	);
	const measureSizeValueRef = useRef<number>(
		props.isEditor
			? scoreProps
				? scoreProps.beatSize * scoreProps.beatCount
				: DMEASURESIZE
			: DMEASURESIZE,
	);
	const notesSizeValueRef = useRef<number>(
		props.isEditor ? (scoreProps?.notesSize ?? DNOTESSIZE) : DNOTESSIZE,
	);
	const mainScoreValueRef = useRef<boolean>(
		props.isEditor ? (scoreProps?.mainScore ?? DMAINSCORE) : DMAINSCORE,
	);

	const close = () => {
		props.onOpenChange(false);
		// measureCountValueRef.current = null;
		// lineCountValueRef.current = null;
		// beatCountValueRef.current = null;
		// measureSizeValueRef.current = null;
		// notesSizeValueRef.current = null;
		// mainScoreValueRef.current = null;
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
					<Dialog.Title className="radix-dialog-title">楽譜設定</Dialog.Title>

					<div className="radix-dialog-inputgroup">
						小節の数
						<InputNumber
							defaultValue={scoreProps?.measureCount ?? DMEASURECOUNT}
							onChange={(v) => {
								if (!v) return;
								measureCountValueRef.current = v;
							}}
							style={{ width: "100%" }}
						/>
						線の数
						<InputNumber
							defaultValue={scoreProps?.lineCount ?? DLINECOUNT}
							onChange={(v) => {
								if (!v) return;
								lineCountValueRef.current = v;
							}}
							style={{ width: "100%" }}
						/>
						小節の拍数
						<InputNumber
							defaultValue={scoreProps?.beatCount ?? DBEATCOUNT}
							onChange={(v) => {
								if (!v) return;
								beatCountValueRef.current = v;
							}}
							style={{ width: "100%" }}
						/>
						小節のサイズ
						<InputNumber
							addonAfter="px"
							defaultValue={
								scoreProps ? scoreProps.beatSize * scoreProps.beatCount : DMEASURESIZE
							}
							onChange={(v) => {
								if (!v) return;
								measureSizeValueRef.current = v;
							}}
							style={{ width: "100%" }}
						/>
						ノーツのサイズ
						<InputNumber
							addonAfter="px"
							disabled={props.isEditor}
							defaultValue={scoreProps?.notesSize ?? DNOTESSIZE}
							onChange={(v) => {
								if (!v) return;
								notesSizeValueRef.current = v;
							}}
							style={{ width: "100%" }}
						/>
						メインスコアに設定
						<Checkbox
							defaultChecked={scoreProps?.mainScore}
							onChange={(v) => {
								mainScoreValueRef.current = v.target.checked;
							}}
						/>
					</div>

					<div className="radix-dialog-actiongroup">
						<button
							type="button"
							className="radix-dialog-action-right"
							onClick={() => {
								const newScoreProps = {} as ScoreProps;
								newScoreProps.beatCount = beatCountValueRef.current;
								newScoreProps.beatSize =
									measureSizeValueRef.current / beatCountValueRef.current;
								newScoreProps.lineCount = lineCountValueRef.current;
								newScoreProps.measureCount = measureCountValueRef.current;
								newScoreProps.notesSize = notesSizeValueRef.current;

								if (props.isEditor) {
									if (!scoreProps) return;
									updateScore({ ...scoreProps, ...newScoreProps });
									updateMainScore(mainScoreValueRef.current ? props.scoreId : null);
								} else {
									const newId = createNewId();
									addScore({
										...newScoreProps,
										notes: [],
										x: 0,
										y: 0,
										stringLabels: [],
										id: newId,
									});
									updateMainScore(mainScoreValueRef.current ? newId : null);
								}

								close();
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
									close();
								}}
							>
								削除
							</button>
						) : null}
						<button
							type="button"
							className="radix-dialog-action-left"
							onClick={() => close()}
						>
							キャンセル
						</button>
					</div>

					<Dialog.Close asChild>
						<button
							onClick={() => close()}
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

export default ScoreEditDialog;
