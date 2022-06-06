import React from "react";

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
import PropTypes from "prop-types";

export default function PokemonCard({ navigation, uri }) {
  // Fetch pokemon info for the card
  // Add "_from_card" to id to avoid conflicts with the all pokemon list
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

  return (
    <View style={[styles.centerFlex, styles.card, styles.shadow]}>
      {isLoading || isFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.centerFlex}>
          <Text style={styles.cardTitle}>
            {capitalizeString(data.forms[0].name)}
          </Text>
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
            style={[styles.detailsButton, styles.shadow, styles.smallShadow]}
          >
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

PokemonCard.propTypes = {
  navigation: PropTypes.any,
  uri: PropTypes.string,
};

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
    shadowRadius: 2,
    // Android
    elevation: 7,
  },
  smallShadow: {
    shadowOffset: { width: -1, height: 3 },
    shadowRadius: 2,
    elevation: 4,
  },
});
