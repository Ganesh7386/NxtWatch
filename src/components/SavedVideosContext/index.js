import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideosList: [],
  pushVideo: () => {},
})

export default SavedVideosContext
