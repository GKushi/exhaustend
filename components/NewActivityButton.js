import React from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { mainMotive } from './colors';
import { AntDesign } from '@expo/vector-icons';

export default function NewActivityButton(){


    return(
    <TouchableOpacity style={styles.container} onPressIn={()=> alert('Pressed')}>
        <AntDesign name='plus' color='white' size={35} style={{ alignSelf:'center' }}/>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainMotive,
        position:'absolute',
        padding:10,
        right:20,
        bottom:20,
        borderRadius:50,
        elevation:11,
        zIndex:1
    }
});