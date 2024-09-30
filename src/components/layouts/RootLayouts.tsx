import styled from "@emotion/styled";

export const RootLayout = styled.div`
  height: 100%;
  width: 100vw;
`;

export const ContentsLayout = styled.div`
  width: 100vw;
  height: 100%;
  display: grid;
  grid-template-rows: 60px 1fr 100px;
  @media screen and (max-height: 460px) {
    grid-template-rows: 40px 1fr 70px;
  }
`;

export const MenuBarLayout = styled.div`
  z-index: 10;
`;

export const MusicControlBarLayout = styled.div`
  display: flex;
  justify-content: center;
`;

export const ScoreSpaceLayout = styled.div`
  overflow: scroll;
`;

export const YouTubePlayerLayout = styled.div`
  width: 420px;
  height: 440px;
  display: flex;
  justify-content: center;
  position: fixed;
  right: 20px;
  top: calc(60px + 10px);
  pointer-events: none;
`;
