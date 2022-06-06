import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import axios from "axios";
import PokemonList from "./PokemonList";
import PropTypes from "prop-types";
function StatsCell({ statName, statValue }) {
  return (
    <View style={styles.statsCell}>
      <Text>{statName}</Text>
      <Text style={{ textAlign: "center" }}>{statValue}</Text>
    </View>
  );
}
function StatsTable({ hp, attack, defense, sAttack, sDefense, speed }) {
  return (
    <View style={styles.statsContainer}>
      <StatsCell statName="Hp" statValue={hp} />
      <StatsCell statName="Attack" statValue={attack} />
      <StatsCell statName="Defense" statValue={defense} />
      <StatsCell statName="S-Attack" statValue={sAttack} />
      <StatsCell statName="S-Defense" statValue={sDefense} />
      <StatsCell statName="Speed" statValue={speed} />
    </View>
  );
}

export default function DetailsScreen({ navigation, route }) {
  // Fetch the Pokemon info
  const {
    isLoading: isLoadingPokemon,
    error: errorPokemon,
    data: pokemon,
    isFetching: isFetchingPokemon,
  } = useQuery(
    route.params.uri,
    () => axios.get(route.params.uri).then((res) => res.data),
    {
      cacheTime: 1000 * 60 * 60 * 60, //1 hour,
      staleTime: 1000 * 60 * 60 * 10, // 10 minutes
    }
  );

  // Fetch pokemon's species and family tree info
  const speciesUrl = pokemon?.species.url;
  const name = pokemon?.species.name;
  const {
    error: errorEvolutions,
    data: evolutions,
    isLoading: isLoadingEvolutions,
    isFetching: isFetchingEvolutions,
  } = useQuery(
    route.params.uri + "_species",
    () =>
      axios
        .get(speciesUrl)
        .then((res) => axios.get(res.data.evolution_chain.url))
        .then((res) => res.data),
    {
      enabled: !isLoadingPokemon && !isFetchingPokemon,
      cacheTime: 1000 * 60 * 60 * 60, // 1 hour
      staleTime: 1000 * 60 * 60 * 10, // 10 minutes
    }
  );

  // On load set the navigation title to pokemon name
  useEffect(() => {
    if (!isLoadingPokemon)
      navigation.setOptions({
        title: capitalizeString(pokemon.forms[0].name) + " Details",
      });
  }, [isLoadingPokemon]);

  if (isLoadingEvolutions || isFetchingEvolutions || isLoadingPokemon) {
    return (
      <View style={styles.detailsView}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (errorPokemon || errorEvolutions) {
    navigation.goBack();
  }

  // Extracts a list of uri's from pokemon evolution chain object
  const evolutionsList = getUrisFromChain(evolutions.chain, name);

  return (
    <View style={styles.detailsView}>
      <Text style={styles.titleText}>
        {capitalizeString(pokemon.forms[0].name)}
      </Text>
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.image}
      />
      <Text style={styles.titleText}>Stats</Text>
      <StatsTable
        hp={pokemon.stats[0].base_stat}
        attack={pokemon.stats[1].base_stat}
        defense={pokemon.stats[2].base_stat}
        sAttack={pokemon.stats[3].base_stat}
        sDefense={pokemon.stats[4].base_stat}
        speed={pokemon.stats[5].base_stat}
      />
      <Text style={styles.titleText}>Family</Text>
      <PokemonList data={evolutionsList} navigation={navigation} />
    </View>
  );
}

// Recursively goes deeper into the chain and returns a list of pokemon uris
function getUrisFromChain(chain, ownName) {
  const uri = "https://pokeapi.co/api/v2/pokemon/" + chain.species.name;
  let iterationResults = [{ uri: uri }];
  if (ownName == chain.species.name) {
    iterationResults = [];
  }

  chain.evolves_to.forEach((element) => {
    iterationResults = iterationResults.concat(
      getUrisFromChain(element, ownName)
    );
  });
  return iterationResults;
}

function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

StatsCell.propTypes = {
  statName: PropTypes.string,
  statValue: PropTypes.number,
};

StatsTable.propTypes = {
  hp: PropTypes.number,
  attack: PropTypes.number,
  defense: PropTypes.number,
  sAttack: PropTypes.number,
  sDefense: PropTypes.number,
  speed: PropTypes.number,
};

DetailsScreen.propTypes = {
  navigation: PropTypes.any,
  route: PropTypes.object,
};
const styles = StyleSheet.create({
  detailsView: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontSize: 25,
  },
  image: {
    resizeMode: "contain",
    maxWidth: 150,
    maxHeight: 150,
    minWidth: 150,
    minHeight: 150,
  },
  statsContainer: {
    flex: 1,
    alignSelf: "stretch",
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    maxHeight: 50,
  },
  statsText: {
    fontSize: 18,
  },
  statsCell: {
    padding: 5,
    textAlign: "center",
  },
});
