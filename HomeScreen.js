import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator, View } from "react-native";
import PokemonList from "./PokemonList";
import { useQuery } from "react-query";
import axios from "axios";

// How many pokemons to load at a time
const LOAD_SIZE = 20;
export default function HomeScreen({ navigation }) {
  const [offset, setOffset] = useState(0);
  const [listData, setListData] = useState([]);
  const fetchPokemon = (offset = 0) =>
    fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=" +
        offset +
        "&limit=" +
        LOAD_SIZE
    ).then((res) => res.json());

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["pokemon", offset], () => fetchPokemon(offset), {
      keepPreviousData: true,
    });

  // Wait for the first load
  useEffect(() => {
    if (!isLoading) {
      dataForList(data, listData, setListData);
      setOffset(offset + LOAD_SIZE);
    }
  }, [isLoading]);
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

// const styles = StyleSheet.create({
//   pokemonListContainer:{
//     }
// });
