import React from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'

export default function EmissionMarker(props){
    const proc = props.proc;
    return(
    <View style={styles.card}>
        <ProgressCircle 
            percent={proc}
            radius={60}
            borderWidth={20}
            bgColor={'white'}
            color={'green'}
            shadowColor={'red'}
            >
        <Text style={styles.text}>{proc}%</Text>
        <Text>bez emisji</Text>
        </ProgressCircle>
    </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius:15,
        elevation:10,
        backgroundColor: 'white',
        shadowOffset: {width:3, height:3},
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius:2,
        padding:8,
        margin:5
    },
    text:{

    }
});