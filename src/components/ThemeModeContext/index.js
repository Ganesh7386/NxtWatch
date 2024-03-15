import React from 'react'

const lightDarkModeContext = React.createContext({
  inLightMode: false,
  changeMode: () => {},
})

export default lightDarkModeContext
