import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, LogBox, Image } from 'react-native';
import EmissionMarker from '../components/EmissionMarker';
import HomePageModule from '../components/HomePageModule';
import { backGround } from '../components/colors';
import NewActivityButton from '../components/NewActivityButton';
import logo from '../components/ExhaustEndHorizontal1.png';
import AcitvityModule from '../components/AcitivityModule';



export default function Home({ czerwonyDystans, zielonyDystans}) {
  
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])
  const lacznyDystans = zielonyDystans + czerwonyDystans;
  const procent = Math.floor((zielonyDystans/lacznyDystans)*100)
  const emisjaNaKilometr = 0.1865
  const lacznaEmisja = Math.floor(czerwonyDystans*emisjaNaKilometr)

  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        
        <Image source={logo} style={{ width:'70%',height:80, alignSelf:'center',resizeMode:'contain', marginBottom:20 }}/>
        
        <View style={styles.emissions}>
          <EmissionMarker proc={procent ? procent : 0} />
          <View style={styles.modules} >
            <HomePageModule title='Łącznie' unit={lacznyDystans + ' km'} />
            <HomePageModule title='Wytworzone CO2' unit={lacznaEmisja + ' kg'}/>
          </View>
        </View>
        <ScrollView style={styles.activity}>
        {!czerwonyDystans && !zielonyDystans ?
          <View>
          <Text style={{ width:'80%', alignSelf:'center', textAlign:'center', fontSize:20, fontWeight:'bold'}}> Nie masz jeszcze zadnej aktywności. Ruszaj się zdrowo! </Text>
          <Text style={{ width:'80%', alignSelf:'center', textAlign:'center'}}> Pierwszy wpis pojawi się po skończonym spacerze lub przejazdzce.</Text>
          </View>
           : 
           <>
            <AcitvityModule goodActivity distance={zielonyDystans}/>
            <AcitvityModule distance={czerwonyDystans}/>
          </>
        }

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