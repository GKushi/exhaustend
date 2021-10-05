import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import CharityCard from '../components/CharityCard';
import { backGround } from '../components/colors';

export default function Charity() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView> 
        <Text style={styles.text}>Zbiórki charytatywne</Text>
        <View style={styles.charityCardContainer}>
          <CharityCard imageUrl='https://zrzutka.pl/uploads/chipin/xthfdf/cover/orginal/c2a5c5b24691dcefa5f360d88593bd44.jpeg' title='Zalane schronisko w Wadowicach Dolnych' link='https://google.com/'/>
          <CharityCard imageUrl='https://zrzutka.pl/uploads/chipin/25c6ud/cover/orginal/3bc50bbeaae246106f778afcff08b400.jpeg' title='Ratujmy życie Konrada, który sam nie bał się go ofiarować nam wszystkim.' link='https://zrzutka.pl/25c6ud'/>
          <CharityCard imageUrl='https://zrzutka.pl/uploads/chipin/wggzr7/cover/orginal/51c6ba3dec3d05b3c71bb2352d2b5c45.jpeg' title='300 zwierząt bez jedzenia i leczenia' link='https://zrzutka.pl/wggzr7'/>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop:20,
    backgroundColor: backGround,
  },
  text:{
    fontSize: 30,
    margin: 20,
    fontWeight:'bold',
  },
  charityCardContainer:{
    backgroundColor:'white',
    borderTopRightRadius:25,
    paddingTop:30,
  }
});