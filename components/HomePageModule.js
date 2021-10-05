import React from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';

export default function HomePageModule(props){

    const title = props.title;
    const unit = props.unit;
    return(
    <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.unit}>{unit}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius:20,
        elevation:10,
        backgroundColor: 'white',
        shadowOffset: {width:3, height:3},
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius:2,
        padding:10,
        margin:5,
    },
    title:{
        textAlign:'center',
        fontSize:15
    },
    unit:{
        textAlign:'center',
        fontSize:25,
        fontWeight:'bold'
    }
});