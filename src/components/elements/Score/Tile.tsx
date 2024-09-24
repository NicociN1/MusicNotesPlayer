import styled from "@emotion/styled";
import { useState } from "react";

const StyledTile = styled.div`
  width: 48px;
  height: 48px;
	border: solid 2px black;
  transition: background-color 0.1s ease-out;
	flex-shrink: 0;
`;

export interface TileProps {
	color: string;
	defaultEnabled: boolean;
	id: string;
}

const Tile = (props: TileProps) => {
	const [isEnabled, setEnable] = useState(props.defaultEnabled);
	return (
		<StyledTile
			onClick={() => setEnable(!isEnabled)}
			style={{ backgroundColor: isEnabled ? props.color : "transparent" }}
		/>
	);
};

export default Tile;
