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
  const { musicSettings, setMusicSettings } = useScoresGlobal();
  const bpmValueRef = useRef<number>(musicSettings.bpm);
  const youtubeUrlValueRef = useRef<string>(musicSettings.youtubeUrl);
  const startTimeValueRef = useRef<number>(musicSettings.startTime);
  const showVerticalLineValueRef = useRef<boolean>(
    musicSettings.showVerticalLine,
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (props.open) {
      bpmValueRef.current = musicSettings.bpm;
      youtubeUrlValueRef.current = musicSettings.youtubeUrl;
      startTimeValueRef.current = musicSettings.startTime;
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
              defaultValue={musicSettings.bpm}
              onChange={(v) => {
                if (v == null) return;
                bpmValueRef.current = v;
              }}
              style={{ width: "100%" }}
              step={1}
              min={1}
            />
            YouTubeURL
            <Input
              defaultValue={musicSettings.youtubeUrl}
              onChange={(v) => {
                if (v == null) return;
                youtubeUrlValueRef.current = v.target.value;
              }}
              style={{ width: "100%" }}
            />
            開始までの時間
            <InputNumber
              defaultValue={musicSettings.startTime}
              onChange={(v) => {
                if (v == null) return;
                startTimeValueRef.current = v;
              }}
              style={{ width: "100%" }}
            />
            現在位置の線を表示
            {/* <Checkbox
							defaultChecked={musicSettings.showVerticalLine ?? true}
							onChange={(e) => {
								showVerticalLineValueRef.current = e.target.checked;
							}}
						/> */}
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

                console.log(newSaveData);
                setMusicSettings(newSaveData);
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
