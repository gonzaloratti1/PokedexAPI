import React from 'react'
import { Navigation } from './components/Navigation'
import { Routes, Route, Navigate } from "react-router-dom"
import { HomePage } from './pages'
import { SearchPage } from './pages'
import { PokemonPage } from './pages'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<HomePage />} />
                <Route path='pokemon/:id' element={<PokemonPage />} />
                <Route path='search' element={<SearchPage />} />
            </Route>
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>

    )
}

export default AppRouter