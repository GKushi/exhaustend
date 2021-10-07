import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AcitvityModule(props){

    const [activityColor, setActivityColor] = useState('red');
    const [activityIcon, setActivityIcon] = useState('car-hatchback');
    const [activityType, setActivityType] = useState('Dystans ze spalinami');

    const distance = props.distance;
    const goodActivity = props.goodActivity;

    useEffect(() =>{
        if(goodActivity){
        setActivityColor('green');
        setActivityIcon('bicycle');
        setActivityType('Czysty dystans')
        }
        return() =>{
            setActivityColor('red');
            setActivityIcon('car-hatchback');
            setActivityType('Dystans ze spalinami');
        }
    },[goodActivity]);
    

    return(
    <View style={styles.card}>
        <View style={{...styles.colorType, backgroundColor:activityColor, borderColor:activityColor}}></View>
        <View style={styles.cardContent}>
            <MaterialCommunityIcons name={activityIcon} color='black' size={50} style={{ alignSelf:'center', width:'25%' }}/>
            <View style={styles.activityContainer}>
                <Text style={styles.acitivityType}>{activityType}</Text>
                <Text style={styles.activityTime}> {props.id}</Text>
            </View>
            <Text style={styles.distance}>{distance} km</Text>
        </View>
        
    </View>
    );
};

const styles = StyleSheet.create({
    colorType:{
        width:20, 
        height:'100%',
        borderTopLeftRadius:19,
        borderBottomLeftRadius:19,
        borderWidth:2
        
    },
    card: {
        borderRadius:20,
        borderWidth:2,
        borderColor:'black',
        elevation:10,
        backgroundColor: 'white',
        shadowOffset: {width:3, height:3},
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius:2,
        margin:5,
        height:70,
        width:'80%',
        alignSelf:'center',
        flexDirection:"row",
    },
    cardContent:{
        margin:10,
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between'
    },
    distance:{
        alignSelf:'center',
        fontSize:15,
        fontWeight:'bold',
        width:'30%',
        textAlign:'center',
    },
    activityContainer:{
        justifyContent:'space-evenly',
        margin:3,
        width:'45%'
    },
    activityTime:{
        fontSize:10
    },
    acitivityType:{
        fontSize:12,
        fontWeight:'bold'

    }
});