import * as React from "react";
import PropTypes from "prop-types";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import PokemonCard from "./PokemonCard";
export default function PokemonList({
  navigation,
  data,
  onEndReached,
  footer,
}) {
  const renderCard = ({ item }) => (
    <PokemonCard navigation={navigation} uri={item.uri} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns="2"
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.uri}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={footer}
      />
    </SafeAreaView>
  );
}

PokemonList.propTypes = {
  navigation: PropTypes.any,
  data: PropTypes.array,
  onEndReached: PropTypes.func,
  footer: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },
});
