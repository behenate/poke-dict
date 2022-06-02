import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import PokemonList from "./PokemonList";

const mockEvolutions = [{ name: "eevee1" }, { name: "eevee2" }];
function StatsCell(props) {
  return (
    <View style={styles.statsCell}>
      <Text>{props.statName}</Text>
      <Text style={{ textAlign: "center" }}>{props.statValue}</Text>
    </View>
  );
}
function StatsTable() {
  return (
    <View style={styles.statsContainer}>
      <StatsCell statName="Hp" statValue="55" />
      <StatsCell statName="Attack" statValue="55" />
      <StatsCell statName="Defense" statValue="55" />
      <StatsCell statName="S-Attack" statValue="55" />
      <StatsCell statName="S-Defense" statValue="55" />
      <StatsCell statName="Speed" statValue="55" />
    </View>
  );
}

export default function DetailsScreen({navigation}) {
  return (
    <View style={styles.detailsView}>
      <Text style={styles.titleText}>Evee</Text>
      <Image
        source={require("/Users/wojciechdrozdz/Code/Pokemon/assets/evee.webp")}
        style={styles.image}
      />
      <Text style={styles.titleText}>Stats</Text>
      <StatsTable />
      <Text style={styles.titleText}>Evolutions</Text>
      <PokemonList data={mockEvolutions} navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  detailsView: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontSize: 25,
  },
  image: {
    resizeMode: "contain",
    maxWidth: 150,
    maxHeight: 150,
  },
  statsContainer: {
    flex: 1,
    alignSelf: "stretch",
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    maxHeight: 50,
  },
  statsText: {
    fontSize: 18,
  },
  statsCell: {
    padding: 5,
    textAlign: "center",
  },
});
