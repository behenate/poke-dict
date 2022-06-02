import * as React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PokemonCard from "./PokemonCard";
export default function PokemonList({ navigation, data }) {
  console.log(data);
  const renderCard = ({ item }) => (
    <PokemonCard navigation={navigation} name={item.name} />
  );
  return (
    <View style={styles.container}>
      <FlatList
        numColumns="2"
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },
});
