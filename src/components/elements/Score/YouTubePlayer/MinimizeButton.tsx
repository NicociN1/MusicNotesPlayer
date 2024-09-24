'use client'
import styled from '@emotion/styled'
import { CloseFullscreen, OpenInFull } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'

const MinimizeContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  width: 36px;
  height: 36px;
  background-color: #333;
  justify-content: center;
  align-items: center;
  z-index: 1;
  pointer-events: auto;
  /* border-radius: 8px; */
`

const MinimizeButton = (props: { onClick: (isMinimized: boolean) => void }) => {
  const [minimized, setMinimized] = useState(false)

  return (
    <MinimizeContainer>
      <IconButton
        onClick={() => {
          props.onClick(!minimized)
          setMinimized(!minimized)
        }}
      >
        {minimized ? <CloseFullscreen htmlColor='white' /> : <OpenInFull htmlColor='white' />}
      </IconButton>
    </MinimizeContainer>
  )
}

export default MinimizeButton
