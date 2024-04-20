import React, {useContext, useState} from 'react'

export const lightDarkModeContext = React.createContext({
  inLightMode: false,
  changeMode: () => {},
})

// export const lightDarkModeContextUser = () => useContext(lightDarkModeContext)

export const LightDarkModeContextProvider = ({children}) => {
  const [mode, setMode] = useState(false)
  const lightDarkModeContextUser = useContext(lightDarkModeContext)
  console.log(lightDarkModeContextUser)
  const handleChangeMode = () => {
    setMode(!mode)
  }

  return (
    <lightDarkModeContext.Provider
      value={{
        inLightMode: mode,
        changeMode: handleChangeMode,
      }}
    >
      {children}
    </lightDarkModeContext.Provider>
  )
}
