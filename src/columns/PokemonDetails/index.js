// Renders the profile and games of a single pokemon
import React, { useEffect } from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

const usePokemonGames = pokemon => {
  const [games, setGames] = React.useState(null);

  const [state, setState] = React.useState("idle");

  useEffect(() => {
    setGames(null);

    setState("loading");

    if (!pokemon) return;
    fetchPokemonGames(pokemon.game_indices.map(game => game.version.name))
      .then(games => {
        setGames(games);
      })
      .catch(() => {
        setState("error");
      })
      .finally(() => {
        setState("idle");
      });
  }, [pokemon]);

  return [games, state];
};

const PokemonGames = props => {
  const [games, state] = usePokemonGames(props.pokemon);

  return (
    <>
      {state === "loading" && <Spinner />}
      {state === "error" && <div>Something went wrong.</div>}
      {state === "idle" && games && <PokemonGamesSection games={games} />}
    </>
  );
};

const usePokemon = name => {
  const [pokemon, setPokemon] = React.useState(null);

  const [state, setState] = React.useState("idle");

  useEffect(() => {
    setPokemon(null);

    setState("loading");

    if (!name) return;
    fetchPokemonByName(name)
      .then(pokemon => {
        setPokemon(pokemon);
      })
      .catch(() => {
        setState("error");
      })
      .finally(() => {
        setState("idle");
      });
  }, [name]);

  return [pokemon, state];
};

const Pokemon = props => {
  const [pokemon, state] = usePokemon(props.name);

  return (
    <Column width={1} p={4}>
      {state === "loading" && <Spinner />}
      {state === "error" && <div>Something went wrong.</div>}
      {state === "idle" && pokemon && (
        <>
          <PokemonProfile pokemon={pokemon} />
          <PokemonGames pokemon={pokemon} />
        </>
      )}
    </Column>
  );
};

export default Pokemon;
