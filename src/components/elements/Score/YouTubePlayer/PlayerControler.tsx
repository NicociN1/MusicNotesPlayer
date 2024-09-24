'use client'
import { useYouTubeVolume } from '@/hooks/YouTubeVolumeProvider'
import styled from '@emotion/styled'
import {
  FastForwardRounded,
  FastRewindRounded,
  PauseRounded,
  PlayArrowRounded,
  SkipPreviousRounded,
  VolumeUpRounded,
} from '@mui/icons-material'
import { IconButton, Slider, Stack } from '@mui/material'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

const ControllerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-top: 16px;
`
const MinimumContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledIconButton = styled(IconButton)`
  width: 40;
  height: 40;
  margin: 0 4px;
`
const AnimateVolume = styled(Slider)`
  transition: width 0.3s;

  &.show {
    visibility: visible;
    animation: fadeIn 0.3s forwards;
  }
  &.hide {
    animation: fadeOut 0.3s forwards;
  }
  @keyframes fadeOut {
    0% {
    }
    100% {
      visibility: hidden;
      opacity: 0.2;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }
`

export interface PlayerControllerHandle {
  getRef(): HTMLDivElement | null
  setIsPlaying(isPlaying: boolean): void
  setVideoTime(videoTime: number): void
  setVideoCurrentTime(currentTime: number): void
}
export interface PlayerControllerProps {
  clickTogglePlay: (setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>) => void
  changeVolume: (volume: number) => void
  changeCurrentTime: (currentTime: number) => void
  clickMoveForward: () => void
  clickMoveRewind: () => void
  clickMoveStart: () => void
}

const PlayerController = forwardRef<PlayerControllerHandle, PlayerControllerProps>(
  (props: PlayerControllerProps, ref) => {
    const localRef = useRef<HTMLDivElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [videoTime, setVideoTime] = useState(0)
    const [showVolume, setShowVolume] = useState(false)
    const { volume, setVolume } = useYouTubeVolume()

    useImperativeHandle(ref, () => ({
      setIsPlaying(isPlaying: boolean) {
        setIsPlaying(isPlaying)
        setCurrentTime(currentTime)
      },
      setVideoCurrentTime(currentTime: number) {
        setCurrentTime(currentTime)
      },
      setVideoTime(videoTime: number) {
        setVideoTime(videoTime)
        // videoDetailRef.current.currentTime = videoTime
      },
      getRef() {
        return localRef.current
      },
    }))

    return (
      <ControllerContainer {...props}>
        <Slider
          min={0}
          max={videoTime}
          value={currentTime}
          sx={{ width: '340px' }}
          color='error'
          onChange={(_ev, value) => {
            setCurrentTime(value as number)
            props.changeCurrentTime(value as number)
          }}
          step={0.001}
        />
        <MinimumContainer>
          <StyledIconButton onClick={props.clickMoveStart}>
            <SkipPreviousRounded fontSize='large' htmlColor='white' />
          </StyledIconButton>
          <StyledIconButton onClick={props.clickMoveRewind}>
            <FastRewindRounded fontSize='large' htmlColor='white' />
          </StyledIconButton>
          <StyledIconButton onClick={() => props.clickTogglePlay(setIsPlaying)}>
            {isPlaying ? (
              <PauseRounded fontSize='large' htmlColor='white' />
            ) : (
              <PlayArrowRounded fontSize='large' htmlColor='white' />
            )}
          </StyledIconButton>
          <StyledIconButton onClick={props.clickMoveForward}>
            <FastForwardRounded fontSize='large' htmlColor='white' />
          </StyledIconButton>
          <Stack
            spacing={2}
            direction='row'
            sx={{
              alignItems: 'center',
              mb: 1,
              marginBottom: 0,
            }}
          >
            <StyledIconButton onClick={() => setShowVolume(!showVolume)}>
              <VolumeUpRounded fontSize='large' htmlColor='white' />
            </StyledIconButton>
            <AnimateVolume
              aria-label='Volume'
              defaultValue={100}
              min={0}
              max={100}
              step={1}
              value={volume}
              style={{ margin: 0, width: showVolume ? '100px' : '0' }}
              valueLabelDisplay='auto'
              className={showVolume ? 'show' : 'hide'}
              onChange={(_ev, value) => {
                setVolume(value as number)
                props.changeVolume(value as number)
              }}
            />
          </Stack>
        </MinimumContainer>
      </ControllerContainer>
    )
  },
)
PlayerController.displayName = 'PlayerController'

export default PlayerController
