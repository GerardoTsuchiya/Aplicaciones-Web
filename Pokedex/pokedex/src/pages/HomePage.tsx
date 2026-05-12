import { useEffect, useState } from "react";
import type { PokemonListItem } from "../types/pokemon";
import { getPokemonList } from "../services/pokemonService";


function HomePage() {
    const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPokemons() {
            try {
                const data = await getPokemonList(20);
                setPokemons(data.results);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("No sé que pasó la neta");
                }
                setLoading(false);
            }
        }

        fetchPokemons();
    }, []);

    return (
        <div>
            <h1>Pokémon List</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error &&
                <ul>
                        {pokemons.map((pokemon) => {
                            const id = pokemon.url.split('/').filter(Boolean).pop();
                            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                            
                            return (
                                <li key={pokemon.name}>
                                    <img src={imageUrl} alt={pokemon.name} />
                                    <p>{pokemon.name}</p>
                                </li>
                            );
                        })}
                </ul>}
        </div>
    )
}

export default HomePage;