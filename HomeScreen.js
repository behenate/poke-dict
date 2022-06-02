import * as React from "react";
import PokemonList from "./PokemonList";
const DATA = [
  { name: "evee" },
  { name: "eveee" },
  { name: "eveees" },
  { name: "eveeed" },
  { name: "eveeef" },
  { name: "eveeeg" },
  { name: "eveeeh" },
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
