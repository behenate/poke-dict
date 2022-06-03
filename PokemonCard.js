import * as React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import axios from "axios";

export default function PokemonCard({ navigation, uri }) {

  const { isLoading, error, data, isFetching } = useQuery(
    uri + "_from_card",
    () => axios.get(uri).then((res) => res.data),
    {
      cacheTime: 1000 * 60 * 60 * 60, //1 hour
    }
  );

  if (isLoading || isFetching) {
    return (
      <View style={[styles.card, styles.shadow]}>
        <Text style={styles.cardTitle}>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return <Text>Error connecting to api!</Text>;
  }
  const id = data.id;
  const pokemonName =
    data.forms[0].name.charAt(0).toUpperCase() + data.forms[0].name.slice(1);
  return (
    <View style={[styles.card, styles.shadow]}>
      <Text style={styles.cardTitle}>{pokemonName}</Text>
      <Image
        source={{ uri: data.sprites.front_default }}
        style={styles.thumbnail}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.push("Details", {
            uri: uri,
          })
        }
        style={[styles.detailsButton, styles.smallShadow]}
      >
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#fff",
    height: 200,
    width: 150,
    borderRadius: 20,
    margin: 10,
  },
  thumbnail: {
    width: 75,
    height: 75,
    resizeMode: "contain",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 17,
    color: "#555",
  },
  detailsButton: {
    borderColor: "#EEE",
    padding: 22,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: "#EEE",
  },
  detailsButtonText: {
    fontSize: 15,
  },
  shadow: {
    shadowColor: "#171717",
    // iOS
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    // Android
    elevation: 5,
  },
  smallShadow: {
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: { width: -1, height: 2 },
    elevation: 5,
  },
});
