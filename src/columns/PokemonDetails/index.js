// Renders the profile and games of a single pokemon
import React, { useEffect } from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

const PokemonGames = props => {
  const [games, setGames] = React.useState(null);
  const [state, setState] = React.useState("idle");

  useEffect(() => {
    if (!props.pokemon) return;

    setGames(null);

    setState("loading");

    fetchPokemonGames(props.pokemon.game_indices.map(game => game.version.name))
      .then(games => {
        setGames(games);
      })
      .catch(() => {
        setState("error");
      })
      .finally(() => {
        setState("idle");
      });
  }, [props.pokemon]);

  return (
    <>
      {state === "loading" && <Spinner />}
      {state === "error" && <div>Something went wrong.</div>}
      {state === "idle" && games && <PokemonGamesSection games={games} />}
    </>
  );
};

const Pokemon = props => {
  const [pokemon, setPokemon] = React.useState(null);
  const [state, setState] = React.useState("idle");

  useEffect(() => {
    if (!props.name) return;

    setPokemon(null);

    setState("loading");
    fetchPokemonByName(props.name)
      .then(pokemon => {
        setPokemon(pokemon);
      })
      .catch(() => {
        setState("error");
      })
      .finally(() => {
        setState("idle");
      });
  }, [props.name]);

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
