import React from 'react';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';

export default function CharityCard(props){
    const imageUrl = props.imageUrl;
    const title = props.title;
    const link = props.link;

    return(
        <View style={styles.card} >
        <TouchableOpacity onPress={() => Linking.openURL(link)}>
            <View style={styles.cardContent}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius:15,
        elevation:10,
        backgroundColor: '#effbf4',
        shadowOffset: {width:3, height:3},
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius:2,
        width:'80%',
        alignSelf:'center',
        marginVertical:10
    },
    image: {
        width:'100%',
        height:150,
        borderRadius:15,
    },
    title:{
        fontSize: 18,
        textAlign:'left',
        margin:15,
    },
});