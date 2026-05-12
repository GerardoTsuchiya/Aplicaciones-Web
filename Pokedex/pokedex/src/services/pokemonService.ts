import type { Pokemon, PokemonListResponse } from '../types/pokemon';

export async function getPokemonList(limit: number): Promise<PokemonListResponse> {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Error fetching Pokémon list: ${response.statusText}`);
        }
        const data = await response.json() as PokemonListResponse;
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon list:', error);
        throw error;
    }
}

export async function getPokemonDetails(idOrName: number | string): Promise<Pokemon> {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
        if (!response.ok) {
            throw new Error(`Error fetching Pokémon details: ${response.statusText}`);
        }
        const data = await response.json() as Pokemon;
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        throw error;
    }
}