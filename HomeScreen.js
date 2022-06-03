import * as React from "react";
import PokemonList from "./PokemonList";
const DATA = [
  { uri: "https://pokeapi.co/api/v2/pokemon/1" },
  { uri: "https://pokeapi.co/api/v2/pokemon/2" },
  { uri: "https://pokeapi.co/api/v2/pokemon/3" },
  { uri: "https://pokeapi.co/api/v2/pokemon/4" },
  { uri: "https://pokeapi.co/api/v2/pokemon/5" },
  { uri: "https://pokeapi.co/api/v2/pokemon/6" },
  { uri: "https://pokeapi.co/api/v2/pokemon/7" },
];
export default function HomeScreen({ navigation }) {
  return (
    // <FlatList
    // numColumns='2'
    // data={DATA}
    // renderItem={renderCard}
    // keyExtractor={item=>item.name}>
    // </FlatList>
    <PokemonList navigation={navigation} data={DATA} />
  );
}

// const styles = StyleSheet.create({
//   pokemonListContainer:{
//     }
// });
