import { useGlobalShortcutKey } from "@/hooks/GlobalShortcutKey";
import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import { useYouTubeGlobal } from "@/hooks/YouTubeGlobal";
import styled from "@emotion/styled";
import { Add, DriveFolderUpload, MusicVideo, Save, Tune } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import MusicSettingsDialog from "../Dialog/MusicSettingsDialog";
import ScoreEditDialog from "../Dialog/ScoreEditDialog";
import { ScoreProps } from "../Score/Score";
import YouTubeIFrame from "./YTIFrame";

const ControlBarWrapper = styled.div`
  width: 100vw;
  background-color: #111;
  box-shadow: 0 0 8px #111;
  transition: 0.3s max-height ease-out;
  position: relative;
  display: block;
  padding-bottom: 16px;
	z-index: 2;
`;
const ButtonGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 56px) 56px;
  grid-template-rows: repeat(auto-fill, 56px);
  @media screen and (max-height: 460px) {
    grid-template-columns: repeat(auto-fill, 40px) 40px;
    grid-template-rows: repeat(auto-fill, 40px);
	}
`;
const YouTubeIframeContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: 0.15s opacity;
`;

const MenuBar = () => {
	const [isOpened, setOpen] = useState<boolean>(false);
	const [scoreDialogOpen, setScoreDialogOpen] = useState(false);
	const [musicDialogOpen, setMusicDialogOpen] = useState(false);
	const { jsonImport, jsonExport } = useScoresGlobal();
	const { iFrameRef } = useYouTubeGlobal();

	useGlobalShortcutKey([
		{
			key: "m",
			action: () => {
				setOpen(!isOpened);
			},
		},
	]);

	return (
		<ControlBarWrapper style={{ maxHeight: isOpened ? "400px" : "100%" }}>
			<ScoreEditDialog
				isEditor={false}
				open={scoreDialogOpen}
				onOpenChange={(open) => {
					setScoreDialogOpen(open);
				}}
				scoreId={-1}
			/>
			<MusicSettingsDialog
				open={musicDialogOpen}
				onOpenChange={(open) => {
					setMusicDialogOpen(open);
				}}
			/>
			<ButtonGrid>
				<Tooltip title="Create Score">
					<IconButton
						sx={{ color: "white" }}
						onClick={() => {
							setScoreDialogOpen(true);
						}}
					>
						<Add fontSize="large" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Export .json">
					<IconButton
						sx={{ color: "white" }}
						onClick={() => {
							if (!iFrameRef.current) return;
							const title = iFrameRef.current.getInternalPlayer()?.getIframe()?.title as
								| string
								| undefined;
							jsonExport(title ?? "");
						}}
					>
						<Save fontSize="large" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Import .json">
					<IconButton
						sx={{ color: "white" }}
						onClick={async () => {
							jsonImport();
						}}
					>
						<DriveFolderUpload fontSize="large" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Music Settings">
					<IconButton
						onClick={() => {
							setMusicDialogOpen(true);
						}}
					>
						<Tune fontSize="large" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Music Video (M)">
					<IconButton
						onClick={() => setOpen(!isOpened)}
						sx={{ color: "white", gridColumn: -2, gridRow: 1 }}
					>
						<MusicVideo fontSize="large" />
					</IconButton>
				</Tooltip>
			</ButtonGrid>
			<YouTubeIframeContainer
				style={isOpened ? {} : { pointerEvents: "none", opacity: 0 }}
			>
				<YouTubeIFrame />
			</YouTubeIframeContainer>
		</ControlBarWrapper>
	);
};

export default MenuBar;
