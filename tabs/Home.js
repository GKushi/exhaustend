import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, TextInput, Button } from 'react-native';
import EmissionMarker from '../components/EmissionMarker';
import HomePageModule from '../components/HomePageModule';
import { backGround } from '../components/colors';
import AcitvityModule from '../components/AcitivityModule';
import NewActivityButton from '../components/NewActivityButton';
import { openDatabase } from "react-native-sqlite-storage";

export const db = openDatabase({
  name: "rn_sqlite",
});

export default function Home() {
  const [activity, setActivity] = useState("");
  const [coords, setCoords] = useState("");
  const [routes, setRoutes] = useState([]);

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS routes (id INTEGER PRIMARY KEY AUTOINCREMENT, activity VARCHAR(30), coords TEXT)`,
        [],
        (sqlTxn, res) => {
          console.log("table created successfully");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });
  };

  const addRoute = () => {
    if (!activity || !coords) {
      alert("Enter input");
      return false;
    }

    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO routes (activity, coords) VALUES (?,?)`,
        [activity, coords],
        (sqlTxn, res) => {
          console.log(`${activity} added successfully`);
          setRoutes("");
        },
        error => {
          console.log("error on adding route " + error.message);
        },
      );
    });
    getRoutes();
  };

  const getRoutes = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM routes ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log("Routes retrieved successfully");
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, activity: item.activity, coords: item.coords });
              console.log("Get ", item.coords, " ", item.id)
              console.log("Get ", item.coords)
            }

            setRoutes(results);
          }
        },
        error => {
          console.log("error on getting Routes " + error.message);
        },
      );
    });
  };

  const renderRoute = ({ item }) => {
    console.log(item)
    return (
      <AcitvityModule id={item.id}/>
      
    );
  };


  useEffect(async () => {
    await createTables();
    await getRoutes();
  }, []);




  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        
        <Text style={{fontSize: 30, margin: 15, fontWeight:'bold'}}>Strona główna</Text>
        <View style={styles.emissions}>
          <EmissionMarker proc={99} />
          <View style={styles.modules} >
            <HomePageModule title='Łącznie' unit='500 km' />
            <HomePageModule title='Wytworzone CO2' unit='500 kg'/>
            <TextInput
        placeholder="Enter activity"
        value={activity}
        onChangeText={setActivity}
        style={{ marginHorizontal: 20 }}
      />
      <TextInput
        placeholder="Enter coords"
        value={coords}
        onChangeText={setCoords}
        style={{ marginHorizontal: 8 }}
      />

      <Button title="Submit" onPress={addRoute} />
          </View>
        </View>
        <ScrollView style={styles.activity} showsVerticalScrollIndicator={false}>
          <FlatList
          data={routes}
          renderItem={renderRoute}
          key={cat => cat.id}
          />
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