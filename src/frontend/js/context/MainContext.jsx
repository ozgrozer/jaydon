import React, { useState, createContext } from 'react'

const MainContext = createContext()

const MainProvider = props => {
  const [state, setState] = useState({
    isAuthenticated: window.defaults.isAuthenticated || false
  })

  return (
    <MainContext.Provider value={[state, setState]}>
      {props.children}
    </MainContext.Provider>
  )
}

export {
  MainContext,
  MainProvider
}
