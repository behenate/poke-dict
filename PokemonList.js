import * as React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PokemonCard from "./PokemonCard";
export default function PokemonList({ navigation, data }) {
  const renderCard = ({ item }) => (
    <PokemonCard navigation={navigation} uri={item.uri} />
  );
  return (
    <View style={styles.container}>
      <FlatList
        numColumns="2"
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.uri}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },
});
