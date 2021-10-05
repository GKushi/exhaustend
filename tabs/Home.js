import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import EmissionMarker from '../components/EmissionMarker';
import HomePageModule from '../components/HomePageModule';
import { backGround } from '../components/colors';


export default function Home() {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={{fontSize: 30, margin: 20, fontWeight:'bold'}}>Strona główna</Text>
        <View style={styles.emissions}>
          <EmissionMarker proc={80} />
          <View style={styles.modules} >
            <HomePageModule title='Łącznie' unit='500 km' />
            <HomePageModule title='Wytworzone CO2' unit='500 kg'/>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop:20,
    backgroundColor: backGround,
  },
  emissions:{
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  modules:{
    width:'45%',
    justifyContent:'space-evenly'
  }
});