import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

function StatsTable({props}){
    return(
            <View style={styles.statsContainer}>
                <Text style={styles.statsText}>Total: </Text>
                <Text style={styles.statsText}>Stat1: Bla Bla</Text>
                <Text style={styles.statsText}>Stat1: Bla Bla</Text>
                <Text style={styles.statsText}>Stat1: Bla Bla</Text>
                <Text style={styles.statsText}>Stat1: Bla Bla</Text>
            </View>
    )
}

export default function DetailsScreen({navigation}){
    return(
        <View style={styles.detailsView}>
            <Text style={styles.titleText}>Evee</Text>
            <Image 
            source={require("/Users/wojciechdrozdz/Code/Pokemon/assets/evee.webp")}
            style={styles.image}
            />
            
            {/* <Text style={} */}
        </View>
    );
}
const styles = StyleSheet.create({
    detailsView: {
        flex:1,
        alignItems:'center'
    },
    titleText:{
        fontSize:25
    },
    image:{
        resizeMode:'contain',
        maxWidth:150,
        maxHeight:150
    },
    statsContainer:{
        flex:1,
        alignSelf:'stretch',
        padding:30
    },
    statsText:{
        fontSize:18
    },
});