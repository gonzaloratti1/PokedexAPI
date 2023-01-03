import React from 'react'
import { PokemonContext } from './PokemonContext'
import { useState, useEffect } from 'react';
import { useForm } from '../hook/useForm';

export const PokemonProvider = ({ children }) => {

    const [globalPokemons, setGlobalPokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([]);
    const [offset, setOffset] = useState(0);

    // Utilizar customHook -useForm para extraer
    const { valueSearch, onInputChange, onResetForm } = useForm({
        valueSearch: ''
    })


    //Estado para la aplicacion simple
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(false);

    // Llamar 50 pokemones a la API
    const getAllPokemons = async (limit = 50) => {
        const baseUrl = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${baseUrl}pokemon?limit=$100000&offset=${offset}`)
        const data = await res.json()

        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })

        const results = await Promise.all(promises)

        setAllPokemons([...allPokemons, ...results]);
        setLoading(false);
    }

    const getGlobalPokemons = async () => {
        const baseURL = 'https://pokeapi.co/api/v2/';

        const res = await fetch(
            `${baseURL}pokemon?limit=100000&offset=${offset}`
        );
        const data = await res.json();

        const promises = data.results.map(async pokemon => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        });
        const results = await Promise.all(promises);

        setGlobalPokemons(results);
        setLoading(false);
    };

    // Llamar a un pokemon por ID
    const getPokemonById = async id => {
        const baseUrl = 'https://pokeapi.co/api/v2/';

        const res = await fetch(`${baseUrl}pokemon/${id}`)
        const data = await res.json()
        return data;
    }

    useEffect(() => {
        getAllPokemons()
    }, [offset]);

    useEffect(() => {
        getGlobalPokemons()
    }, [])

    const onClickLoadMore = () => {
        setOffset(offset + 50)
    }

    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [typeSelected, setTypeSelected] = useState({
        grass: false,
        normal: false,
        fighting: false,
        flying: false,
        poison: false,
        ground: false,
        rock: false,
        bug: false,
        ghost: false,
        steel: false,
        fire: false,
        water: false,
        electric: false,
        psychic: false,
        ice: false,
        dragon: false,
        dark: false,
        fairy: false,
        unknow: false,
        shadow: false,
    });

    const handleCheckbox = e => {
        setTypeSelected({
            ...typeSelected,
            [e.target.name]: e.target.checked
        })

        if (e.target.checked) {
            const filteredResults = globalPokemons.filter(pokemon => !pokemon.types.map(type => type.type.name).includes(e.target.name)) 
            setFilteredPokemons([...filteredResults])
        }
        else {

        }
    }
    return (
        <PokemonContext.Provider value={{
            valueSearch,
            onInputChange,
            onResetForm,
            allPokemons,
            globalPokemons,
            getPokemonById,
            getAllPokemons,
            onClickLoadMore,
            loading,
            active,
            setActive,
            setLoading,
            filteredPokemons,
            handleCheckbox
        }}>
            {children}
        </PokemonContext.Provider>
    )
}
