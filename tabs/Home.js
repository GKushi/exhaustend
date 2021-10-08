import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, LogBox, Image } from 'react-native';
import EmissionMarker from '../components/EmissionMarker';
import HomePageModule from '../components/HomePageModule';
import { backGround } from '../components/colors';
import NewActivityButton from '../components/NewActivityButton';
import logo from '../components/ExhaustEndHorizontal1.png';



export default function Home({renderRoute, routes}) {
  
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])



  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        
        {/* <Text style={{fontSize: 30, margin: 15, fontWeight:'bold'}}>Strona główna</Text> */}
        
        <Image source={logo} style={{ width:'70%',height:80, alignSelf:'center',resizeMode:'contain', marginBottom:20 }}/>
        
        <View style={styles.emissions}>
          <EmissionMarker proc={99} />
          <View style={styles.modules} >
            <HomePageModule title='Łącznie' unit='500 km' />
            <HomePageModule title='Wytworzone CO2' unit='500 kg'/>
          </View>
        </View>
        {routes.id ? <ScrollView style={styles.activity} >
          <FlatList
          data={routes}
          renderItem={renderRoute}
          keyExtractor={cat => cat.id.toString()}
          showsVerticalScrollIndicator={false}
          />
          <View style={{ backgroundColor:'white', height:50 }}></View>
        </ScrollView> : 
        <View></View>}
        

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