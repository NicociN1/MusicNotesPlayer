import styled from "@emotion/styled";

export const RootLayout = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const MenuBarLayout = styled.div`
  z-index: 10;
  position: absolute;
  position: fixed;
  width: 100vw;
  height: 80px;
  top: 0;
  left: 0;
`;

export const MusicControlBarLayout = styled.div`
  width: 100vw;
  height: 140px;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 16px;
`;

export const ScoresLayout = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  position: absolute;
  top: 80px;
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
