import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import EmissionMarker from '../components/EmissionMarker';
import HomePageModule from '../components/HomePageModule';
import { backGround } from '../components/colors';
import AcitvityModule from '../components/AcitivityModule';
import NewActivityButton from '../components/NewActivityButton';


export default function Home() {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        
        <Text style={{fontSize: 30, margin: 15, fontWeight:'bold'}}>Strona główna</Text>
        <View style={styles.emissions}>
          <EmissionMarker proc={99} />
          <View style={styles.modules} >
            <HomePageModule title='Łącznie' unit='500 km' />
            <HomePageModule title='Wytworzone CO2' unit='500 kg'/>
          </View>
        </View>
        <ScrollView style={styles.activity} showsVerticalScrollIndicator={false}>
          <AcitvityModule goodActivity distance='50'/>
          <AcitvityModule distance='100'/>
          <AcitvityModule goodActivity distance='10'/>
          <AcitvityModule goodActivity distance='50'/>
          <AcitvityModule distance='100'/>
          <AcitvityModule goodActivity distance='10'/>
          <AcitvityModule goodActivity distance='50'/>
          <AcitvityModule distance='100'/>
          <AcitvityModule goodActivity distance='10'/>
          <View style={{ backgroundColor:'white', height:50 }}></View>
        </ScrollView>
        <NewActivityButton/>
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
    justifyContent:'space-evenly',
    marginBottom:50
  },
  modules:{
    width:'45%',
    justifyContent:'space-evenly'
  },
  activity:{
      backgroundColor:'white',
      borderTopRightRadius:25,
      paddingTop:30,
      elevation:10,
      shadowOffset: {width:3, height:3},
      shadowColor: '#000000',
      shadowOpacity: 1,
      shadowRadius:2,
  },
});