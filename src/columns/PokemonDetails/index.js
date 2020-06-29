// Renders the profile and games of a single pokemon
import React from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

const PokemonGames = props => {
  const [games, setGames] = React.useState(null);

  const [state, setState] = React.useState("idle");

  React.useEffect(() => {
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

  React.useEffect(() => {
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

// class PokemonGames extends React.Component {
//   state = {
//     games: null
//   };

//   componentDidMount() {
//     this.fetchGames();
//   }

//   componentDidUpdate(prevProps) {
//     if (
//       (!prevProps.pokemon && this.props.pokemon) ||
//       prevProps.pokemon.name !== this.props.pokemon.name
//     ) {
//       this.fetchGames();
//     }
//   }

//   fetchGames() {
//     this.setState({
//       games: null
//     });

//     if (!this.props.pokemon) return;
//     fetchPokemonGames(
//       this.props.pokemon.game_indices.map(game => game.version.name)
//     ).then(games => {
//       this.setState({
//         games
//       });
//     });
//   }

//   render() {
//     return !this.state.games ? (
//       <Spinner />
//     ) : (
//       <PokemonGamesSection games={this.state.games} />
//     );
//   }
// }

// class Pokemon extends React.Component {
//   state = {
//     pokemon: null
//   };

//   componentDidMount() {
//     this.fetchPokemon();
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.name !== this.props.name) {
//       this.fetchPokemon();
//     }
//   }

//   fetchPokemon() {
//     this.setState({
//       pokemon: null
//     });

//     if (!this.props.name) return;
//     fetchPokemonByName(this.props.name).then(pokemon => {
//       this.setState({
//         pokemon
//       });
//     });
//   }

//   render() {
//     return (
//       <Column width={1} p={4}>
//         {!this.props.name ? null : !this.state.pokemon ? (
//           <Spinner />
//         ) : (
//           <>
//             <PokemonProfile pokemon={this.state.pokemon} />
//             <PokemonGames pokemon={this.state.pokemon} />
//           </>
//         )}
//       </Column>
//     );
//   }
// }

export default Pokemon;
