import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Home</Text>
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