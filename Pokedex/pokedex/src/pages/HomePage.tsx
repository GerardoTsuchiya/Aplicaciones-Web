import { useEffect, useState } from "react";
import type { PokemonListItem } from "../types/pokemon";
import { getPokemonList } from "../services/pokemonService";
import PokemonCard from "../components/PokemonCard";

function HomePage() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPokemonList(20)
      .then((data) => {
        setPokemons(data.results);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      <h1 className="home__title">Pokédex</h1>
      {loading && <p className="status">Cargando Pokémon…</p>}
      {error && <p className="status status--error">{error}</p>}
      {!loading && !error && (
        <div className="grid">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
