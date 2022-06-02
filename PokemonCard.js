import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export default function PokemonCard({navigation}){
    return(
        <View style={[styles.card, styles.shadow]}>
            <Text style={styles.cardTitle}>Evee</Text>
            <Image 
            source={require("/Users/wojciechdrozdz/Code/Pokemon/assets/evee.webp")}
            style={styles.thumbnail}
            />
            <TouchableOpacity
                onPress={()=>navigation.navigate('Details')} 
                style={[styles.detailsButton, styles.smallShadow]}>
                <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems:'center',
        alignContent:'center',
        backgroundColor: "#fff",
        height:200,
        width:150,
        borderRadius:20,
        margin:10
    },
    thumbnail:{
        width: 75,
        height:75,
        resizeMode: 'contain',
        marginBottom:10,
    },
    cardTitle:{
        fontSize:17,
        color:"#555"
    },
    detailsButton:{
        borderColor:"#EEE",
        padding:22,
        paddingTop:5,
        paddingBottom:5,
        fontSize:20,
        borderRadius:5,
        backgroundColor:"#EEE",
    },
    detailsButtonText:{
        fontSize:15,
    },
    shadow:{
        shadowColor: '#171717',
        // iOS
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 1,
        // Android
        elevation: 5,
    },
    smallShadow:{
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset:{width:-1, height:2},
        elevation:5
    }
})