import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Pokemon } from "../types/pokemon";
import { getPokemonDetails } from "../services/pokemonService";

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPokemonDetails(id)
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Error al cargar el Pokémon");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="status">Cargando…</p>;
  if (error) return <p className="status status--error">{error}</p>;
  if (!pokemon) return null;

  return (
    <div className="detail">
      <Link to="/" className="detail__back">← Volver</Link>

      <div className="detail__header">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="detail__sprite"
        />
        <div>
          <h1 className="detail__name">{pokemon.name}</h1>
          <p className="detail__number">#{pokemon.id}</p>
          <div className="detail__types">
            {pokemon.types.map((t) => (
              <span key={t.type.name} className={`type type--${t.type.name}`}>
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="detail__section">
        <h2>Información</h2>
        <p>Altura: {pokemon.height / 10} m</p>
        <p>Peso: {pokemon.weight / 10} kg</p>
      </section>

      <section className="detail__section">
        <h2>Habilidades</h2>
        <ul>
          {pokemon.abilities.map((a) => (
            <li key={a.ability.name}>
              {a.ability.name}
              {a.is_hidden && <span> (oculta)</span>}
            </li>
          ))}
        </ul>
      </section>

      <section className="detail__section">
        <h2>Estadísticas base</h2>
        <ul className="detail__stats">
          {pokemon.stats.map((s) => (
            <li key={s.stat.name} className="detail__stat">
              <span className="detail__stat-name">{s.stat.name}</span>
              <span className="detail__stat-bar-wrap">
                <span
                  className="detail__stat-bar"
                  style={{ width: `${Math.min(s.base_stat, 150) / 150 * 100}%` }}
                />
              </span>
              <span className="detail__stat-value">{s.base_stat}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default DetailPage;
