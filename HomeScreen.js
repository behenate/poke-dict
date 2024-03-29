import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";
import PokemonList from "./PokemonList";
import { useQuery } from "react-query";
import PropTypes from "prop-types";

// How many pokemon to load at a time
const LOAD_SIZE = 20;
export default function HomeScreen({ navigation }) {
  const [offset, setOffset] = useState(0);
  const [listData, setListData] = useState([]);

  // Loads an object with a list of LOAD_SIZE pokemn uris
  const fetchPokemon = (offset = 0) =>
    fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=" +
        offset +
        "&limit=" +
        LOAD_SIZE
    ).then((res) => res.json());

  const { isLoading, error, data } = useQuery(
    ["pokemonList", offset],
    () => fetchPokemon(offset),
    {
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 60 * 60, // 1 hour
      staleTime: 1000 * 60 * 60 * 10, // 10 minutes
    }
  );

  if (error) {
    return (
      <View>
        <Text>Could not load the data!</Text>
      </View>
    );
  }

  // On first load populate the list
  useEffect(() => {
    if (!isLoading) {
      dataForList(data, listData, setListData);
      setOffset(offset + LOAD_SIZE);
    }
  }, [isLoading]);

  const footer = () => (
    <View style={styles.footer}>
      <ActivityIndicator size="large" />
    </View>
  );

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <PokemonList
          navigation={navigation}
          data={listData}
          onEndReached={() => {
            setOffset(offset + LOAD_SIZE);
            dataForList(data, listData, setListData);
          }}
          footer={footer}
        />
      )}
    </View>
  );
}

function dataForList(data, listData, setListData) {
  const res = [];
  data.results.forEach((element) => {
    res.push({ uri: element.url });
  });
  setListData([...listData, ...res]);
}

HomeScreen.propTypes = {
  navigation: PropTypes.any,
};
const styles = StyleSheet.create({
  footer: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
});
