import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "react-query";
import axios from "axios";

export default function PokemonCard({ navigation, uri }) {
  console.log(uri);
  const { isLoading, error, data, isFetching } = useQuery(
    uri + "_from_card",
    () => axios.get(uri).then((res) => res.data),
    {
      cacheTime: 1000 * 60 * 60 * 60, //1 hour
    }
  );
  if (error) {
    return <Text>Error connecting to api!</Text>;
  }
  const [pokemonName, setPokemonName] = useState("");
  useEffect(() => {
    if (!isLoading) {
      setPokemonName(
        data.forms[0].name.charAt(0).toUpperCase() + data.forms[0].name.slice(1)
      );
    }
  }, [isLoading]);
  return (
    <View style={[styles.centerFlex, styles.card, styles.shadow]}>
      {isLoading || isFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.centerFlex}>
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
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  centerFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    height: 200,
    width: 150,
    borderRadius: 20,
    margin: 10,
  },
  thumbnail: {
    width: 90,
    height: 90,
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
