'use client'
import styled from '@emotion/styled'
import { Button, Input, Space } from 'antd'
import { useRef, useState } from 'react'
import ReactPlayer from 'react-player'

const UrlInput = styled(Input)`
  width: 300px;
`

interface VideoUrlBarProps {
  handleUrlSubmit: (url: string) => void
}

const VideoUrlBar = (props: VideoUrlBarProps) => {
  const textRef = useRef<string>('')
  const [urlState, setUrlState] = useState<number>(0)

  return (
    <Space.Compact style={{ marginBottom: '12px' }}>
      <UrlInput
        allowClear
        maxLength={300}
        defaultValue='https://youtube.com/watch?v=0xSiBpUdW4E'
        placeholder='YouTube URL'
        status={urlState == 2 ? 'error' : undefined}
        onChange={(ev) => {
          if (ev.target.value.length == 0) {
            setUrlState(0)
          } else {
            const canPlay = ReactPlayer.canPlay(ev.target.value)
            if (canPlay) {
              textRef.current = ev.target.value
              setUrlState(1)
            } else {
              setUrlState(2)
            }
          }
        }}
      ></UrlInput>
      <Button
        type='primary'
        onClick={() => {
          if (urlState != 1) return
          props.handleUrlSubmit(textRef.current)
        }}
      >
        Load
      </Button>
    </Space.Compact>
  )
}

export default VideoUrlBar
