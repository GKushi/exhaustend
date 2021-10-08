import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import CharityCard from '../components/CharityCard';
import { backGround } from '../components/colors';

export default function Charity() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Zbiórki charytatywne</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.charityCardContainer}>
          <CharityCard imageUrl='https://zrzutka.pl/uploads/chipin/dm2c7n/cover/orginal/141cf69d6f2fbcfd0763d7badd4d385d.jpeg' title='Wspólnie ocalmy nasz las !!!' link='https://zrzutka.pl/wspolnylas'/>
          <CharityCard imageUrl='https://www.lasnazawsze.org.pl/wp-content/uploads/sites/52/2020/04/beautiful-beauty-color-dawn-340932-1024x543.jpg' title='Las na zawsze - posadz kawałek lasu' link='https://www.lasnazawsze.org.pl/'/>
          <CharityCard imageUrl='https://zrzutka.pl/uploads/chipin/wggzr7/cover/orginal/51c6ba3dec3d05b3c71bb2352d2b5c45.jpeg' title='300 zwierząt bez jedzenia i leczenia' link='https://zrzutka.pl/wggzr7'/>
          <CharityCard imageUrl='https://cdn.shopify.com/s/files/1/0326/7189/products/Spain-landscape_2000x.png?v=1602174676' title='One tree planted - WE PLANT TREES TOGETHER, PLANTING A FOREST.' link='https://onetreeplanted.org/'/>
          <CharityCard imageUrl='https://internationaltreefoundation.org/wp-content/uploads/2020/06/NKA-BOLGA022-e1627052010350-1024x409.jpg' title='International Tree Fundation' link='https://internationaltreefoundation.org/'/>

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
    margin: 15,
    fontWeight:'bold',
  },
  charityCardContainer:{
    backgroundColor:'white',
    borderTopRightRadius:25,
    paddingTop:30,
    shadowOffset: {width:3, height:3},
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius:2,
    elevation:10
  }
});