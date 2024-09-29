import styled from "@emotion/styled";
import { CSSProperties } from "react";

interface NoteSvgProps {
	width: number;
	height: number;
	color: string;
	style: CSSProperties;
}

const AnimateSvg = styled.svg`
	transition: 0.1s width;
`;

export const NoteSvg = (props: NoteSvgProps) => {
	const radius = Math.min(props.width, props.height) / 2;
	return (
		<AnimateSvg
			width={props.width}
			height={props.height}
			xmlns="http://www.w3.org/2000/svg"
			style={props.style}
		>
			<title>Music Note</title>
			<rect
				width={props.width}
				height={props.height}
				x={0}
				y={0}
				rx={radius}
				ry={radius}
				fill={props.color}
			/>
		</AnimateSvg>
	);
};
