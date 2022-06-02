import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PokemonCard from './PokemonCard';
const DATA = [
  {name:"evee"},
  {name:"eveee"},
  {name:"eveees"},
  {name:"eveeed"},
  {name:"eveeef"},
  {name:"eveeeg"},
  {name:"eveeeh"}

]
export default function HomeScreen({navigation}){
  const renderCard = ({item}) => (
    <PokemonCard navigation={navigation} name={item.name}/>
  )
  return(
    <FlatList 
    numColumns='2'
    data={DATA}
    renderItem={renderCard}
    keyExtractor={item=>item.name}>
    </FlatList>
  );
}

// const styles = StyleSheet.create({
//   pokemonListContainer:{
//     }
// });