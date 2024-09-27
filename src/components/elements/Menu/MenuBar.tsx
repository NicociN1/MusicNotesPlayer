import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import { download, upload } from "@/utils/fileManager";
import styled from "@emotion/styled";
import { Add, Download, MusicVideo, Save, Upload } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
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
  padding-bottom: 24px;
`;
const ButtonGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 64px) 64px;
  grid-template-rows: repeat(auto-fill, 70px);
`;
const YouTubeIframeContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: 0.2s opacity;
`;

const MenuBar = () => {
	const [isOpened, setOpen] = useState<boolean>(false);
	const [scoreDialogOpen, setScoreDialogOpen] = useState(false);
	const { scores, setScores } = useScoresGlobal();

	return (
		<ControlBarWrapper style={{ maxHeight: isOpened ? "400px" : "100%" }}>
			<ScoreEditDialog
				isEditor={false}
				open={scoreDialogOpen}
				onOpenChange={(open) => setScoreDialogOpen(open)}
				scoreId={-1}
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
				<Tooltip title="Download [.json]">
					<IconButton
						sx={{ color: "white" }}
						onClick={() => {
							download(JSON.stringify(scores), "Score.note", "application/json");
						}}
					>
						<Save fontSize="large" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Import [.json]">
					<IconButton
						sx={{ color: "white" }}
						onClick={async () => {
							upload()
								.then((data) => {
									setScores(JSON.parse(data) as ScoreProps[]);
								})
								.catch((e) => console.error(e));
						}}
					>
						<Upload fontSize="large" />
					</IconButton>
				</Tooltip>
				<Tooltip title="Music Video">
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
