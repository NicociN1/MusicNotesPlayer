import styled from "@emotion/styled";
import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const ControlBarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
  background-color: #222;
  box-shadow: 0 0 4px #222;
`;

const MenuBar = () => {
	return (
		<ControlBarWrapper>
			<IconButton sx={{ marginLeft: "auto", color: "white" }}>
				<Add fontSize="large" />
			</IconButton>
		</ControlBarWrapper>
	);
};

export default MenuBar;
