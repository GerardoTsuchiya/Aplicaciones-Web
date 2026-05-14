import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Pokemon } from "../types/pokemon";
import { getPokemonDetails } from "../services/pokemonService";

interface PokemonCardProps {
  name: string;
  url: string;
}

function PokemonCard({ name }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemonDetails(name)
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [name]);

  if (loading) return <div className="card card--loading">{name}…</div>;
  if (!pokemon) return null;

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="card-link">
      <div className="card">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="card__sprite"
        />
        <p className="card__number">#{pokemon.id}</p>
        <p className="card__name">{pokemon.name}</p>
        <div className="card__types">
          {pokemon.types.map((t) => (
            <span key={t.type.name} className={`type type--${t.type.name}`}>
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;
