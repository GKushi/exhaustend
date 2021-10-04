import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import EmissionMarker from '../components/EmissionMarker';


export default function Home() {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Home</Text>
        <View style={styles.emissions}>
          <EmissionMarker proc={80} />
          <EmissionMarker proc={30}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop:20,
    backgroundColor: 'white',
  },
  emissions:{
    flexDirection:'row',
  }
});