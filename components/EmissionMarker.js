import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { mainMotive} from './colors';

export default function EmissionMarker(props){
    const proc = props.proc;
    return(
    <View style={styles.card}>
        <ProgressCircle 
            percent={proc}
            radius={80}
            borderWidth={20}
            bgColor={'white'}
            color={mainMotive}
            shadowColor={'red'}
            >
        <Text style={styles.proctext}>{proc}%</Text>
        <Text style={styles.emissiontext}>bez emisji</Text>
        </ProgressCircle>
    </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius:30,
        elevation:10,
        backgroundColor: 'white',
        shadowOffset: {width:3, height:3},
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius:2,
        padding:10,
        margin:5
    },
    proctext:{
        fontWeight:'bold',
        fontSize:25
    },
    emissiontext:{
        fontSize:15,
        marginBottom:10
    }
});