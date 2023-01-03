import React from 'react'
import { AppRouter } from './AppRouter'
import { PokemonProvider } from './context/PokemonProvider'

const App = () => {
  return (
    <PokemonProvider>
      <AppRouter />
    </PokemonProvider>
  )
}

export default App