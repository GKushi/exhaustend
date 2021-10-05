import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AcitvityModule from '../components/AcitivityModule';


export default function Settings() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Settings</Text>
      <AcitvityModule goodActivity activityType='Jazda rowerem' distance='50'/>
      <AcitvityModule activityType='Jazda samochodem' distance='100'/>
      <AcitvityModule goodActivity activityType='Spacer' distance='10'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop:20,
    backgroundColor: 'white',
  },
});