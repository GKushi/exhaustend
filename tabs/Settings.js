import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { grey,backGround } from '../components/colors'




export default function Settings() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.text}>Spalanie na 100 km twojego samochodu:</Text>
        <TouchableOpacity style={styles.input} onPressIn={()=> alert('W trakcie prac')}>
          <Text style={{textAlign:'center', fontSize:15, color:'white',alignSelf:'center'}}>8l/100km</Text>
        </TouchableOpacity>
      </View>
      </View>
      <Text style={styles.signature}>Made by 2,5 Kacpra :)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop:20,
    backgroundColor: backGround,
  },
  card:{
    marginTop:40,
    borderRadius:20,
    elevation:10,
    backgroundColor: 'white',
    shadowOffset: {width:3, height:3},
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius:2,
    margin:5,
    height:80,

    width:'80%',
    alignSelf:'center',
  },
  cardContent:{
    margin:10,
  },
  text:{
    alignSelf:'center',
    marginBottom:5,
    fontSize:15,
    fontWeight:'bold'
  },
  input:{
    backgroundColor:'lightgrey',
    color:'white',
    alignSelf:'center',
    textAlign:'center',
    width:'40%',
    height:'60%',
    borderRadius:30,
    flexDirection:'row',
    justifyContent:'center'
  },
  signature:{
    alignSelf:'center',
    bottom:'-60%',
    fontSize:20,
    color:'grey'
  }
});