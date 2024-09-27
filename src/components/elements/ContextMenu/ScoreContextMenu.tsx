import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import * as ContextMenu from "@radix-ui/react-context-menu";

interface ContextMenuProps {
	scoreId: number;
	children: React.ReactNode;
}

const ScoreContextMenu = (props: ContextMenuProps) => {
	const { getScore, removeScore, addScore, updateScore, createNewId } = useScoresGlobal();

	const handleAddMeasure = () => {
		const newScore = getScore(props.scoreId);
		if (!newScore || newScore.measureCount >= 100) return;
		newScore.measureCount++;
		updateScore(newScore);
	};
	const handleRemoveMeasure = () => {
		const newScore = getScore(props.scoreId);
		if (!newScore || newScore.measureCount === 1) return;
		newScore.measureCount--;
		updateScore(newScore);
	};
	// const handleSetFollow = () => {

	// }

	return (
		<ContextMenu.Root>
			<ContextMenu.Trigger>{props.children}</ContextMenu.Trigger>
			<ContextMenu.Portal>
				<ContextMenu.Content className="radix-context-content">
					<ContextMenu.Item className="radix-context-item" onClick={handleAddMeasure}>
						詳細設定
					</ContextMenu.Item>
					<ContextMenu.Separator className="ContextMenuSeparator" />
					<ContextMenu.Item
						className="radix-context-item"
						onClick={() => removeScore(props.scoreId)}
						style={{ color: "red" }}
					>
						削除
					</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Portal>
		</ContextMenu.Root>
	);
};

export default ScoreContextMenu;
