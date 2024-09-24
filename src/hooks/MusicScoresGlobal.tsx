'use client'
import PropTypes from 'prop-types'
import React, { createContext, useContext, useState } from 'react'

const GlobalContext = createContext(
  {} as {
    scoreScroll: number
    setScoreScroll: React.Dispatch<React.SetStateAction<number>>
  },
)

export const MusicScoresProvider = ({ children }: { children: React.ReactNode }) => {
  const [scoreScroll, setScoreScroll] = useState(0)

  return (
    <GlobalContext.Provider
      value={{
        scoreScroll: scoreScroll,
        setScoreScroll: setScoreScroll,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

MusicScoresProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useMusicScores = () => useContext(GlobalContext)
