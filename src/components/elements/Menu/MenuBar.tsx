import { useScoresGlobal } from "@/hooks/ScoresGlobal";
import styled from "@emotion/styled";
import { Add, MusicVideo } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
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
	const { addScore, createNewId } = useScoresGlobal();

	return (
		<ControlBarWrapper style={{ maxHeight: isOpened ? "400px" : "100%" }}>
			<ButtonGrid>
				<Tooltip title="Create Score">
					<IconButton
						sx={{ color: "white" }}
						onClick={() => {
							addScore({
								beatCount: 4,
								beatSize: 256,
								lineCount: 6,
								measureCount: 3,
								notesSize: 40,
								id: createNewId(),
								notes: [],
							});
						}}
					>
						<Add fontSize="large" />
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
