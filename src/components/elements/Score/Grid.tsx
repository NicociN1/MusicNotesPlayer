import Tile, { TileProps } from "@/components/elements/Score/Tile";
import styled from "@emotion/styled";

const GridWrapper = styled.div`
  display: flex;
`;

interface GridProps {
	tiles: TileProps[];
}

const Grid = (props: GridProps) => {
	return (
		<GridWrapper>
			{props.tiles.map((t) => (
				<Tile color={t.color} id={t.id} key={t.id} defaultEnabled={false} />
			))}
		</GridWrapper>
	);
};

export default Grid;
