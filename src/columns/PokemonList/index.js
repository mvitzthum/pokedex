// Renders the sidebar with the list of pokemons in the pokedex
import React, { useState, useEffect } from "react";
import { Link } from "@primer/components";
import { Spinner } from "@nice-boys/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState(null);

  const [state, setState] = useState("idle");

  useEffect(() => {
    setState("loading");
    fetchPokemons()
      .then(pokemons => {
        setPokemons(pokemons);
      })
      .catch(() => {
        setState("error");
      })
      .finally(() => {
        setState("idle");
      });
  }, []);

  return [pokemons, state];
};

const PokemonList = props => {
  const [pokemons, state] = usePokemons();

  return (
    <Sidebar>
      <Link onClick={() => props.setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>
      {state === "loading" && <Spinner />}
      {state === "error" && <div>Something went wrong.</div>}
      {state === "idle" &&
        pokemons &&
        pokemons.map(pokemon => (
          <Link
            key={pokemon.name}
            onClick={() => props.setSelectedPokemon(pokemon.name)}
          >
            <SidebarItem>{pokemon.name}</SidebarItem>
          </Link>
        ))}
    </Sidebar>
  );
};

export default PokemonList;
