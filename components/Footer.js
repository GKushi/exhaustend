import React,{ useState, useEffect } from 'react';
import Home from '../tabs/Home';
import Charity from '../tabs/Charity';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Statistics from '../tabs/Statistics';
import Settings from '../tabs/Settings';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mainMotive, grey } from './colors';
import { openDatabase } from "react-native-sqlite-storage";
import AcitvityModule from './AcitivityModule';
import { StyleSheet, View, Text, Image, TextInput, Button, StatusBar } from 'react-native';

export const db = openDatabase({
    name: "rn2_sqlite",
  });

const Tab = createMaterialBottomTabNavigator();

export default function Footer(){

    const [z, setZ] = useState(0);
    const [c, setC] = useState(0);
  
    const [routes, setRoutes] = useState([]);
  
    const [zielonyDystans, setZielonyDystans] = useState(0)
    const [czerwonyDystans, setCzerwonyDystans] = useState(0)
    

    const createTables = () => {
        db.transaction(txn => {
          txn.executeSql(
            `CREATE TABLE IF NOT EXISTS routes (id INTEGER PRIMARY KEY AUTOINCREMENT, dystC Double, dystZ DOUBLE)`,
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
        db.transaction(txn => {
          txn.executeSql(
            `INSERT INTO routes (dystZ, dystC) VALUES (?,?)`,
            [z, c],
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
            `SELECT SUM(dystZ) as dystZ, SUM(dystC) as dystC FROM routes`,
            [],
            (sqlTxn, res) => {
              console.log("Routes retrieved successfully");
              let len = res.rows.length;
    
              if (len > 0) {
                let results = [];
                for (let i = 0; i < len; i++) {
                  let item = res.rows.item(i);
                  console.log(item);
                  setCzerwonyDystans(item.dystC);
                  setZielonyDystans(item.dystZ);
                  console.log("Get ", item.dystZ, " ", item.dystC)
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
    setstate(state + 1);
    console.log(item.id)
    return (
      <AcitvityModule id={item.id}/>
      
    );
  };


  useEffect(() => {
    (async function() {
      await createTables();
      await getRoutes();
    })();
}, []);







    return(
        <Tab.Navigator
            initialRouteName="Home"
            activeColor={mainMotive}
            inactiveColor={grey}
            barStyle={{ backgroundColor: 'white', height: 50 }}
            screenOptions={{ headerShown: false }}
        >
                <Tab.Screen name="Home"
                    children={() => <Home czerwonyDystans={czerwonyDystans} zielonyDystans={zielonyDystans} />}
                    options={{
                        tabBarLabel: 'Strona Główna',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={25} />
                        ),
                    }} />
                <Tab.Screen name='map' 
                children={() => <Statistics setC={setC} setZ={setZ} addRoute={addRoute} />}
                    options={{
                        tabBarLabel: 'Mapa',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="map" color={color} size={25} />
                        ),
                    }} />
                <Tab.Screen name="Charity" component={Charity}
                    options={{
                        tabBarLabel: 'Zbiórki',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="paw" color={color} size={25} />
                        ),
                    }} />
                <Tab.Screen name='Settings'
                    children={() => <Settings />}
                    options={{
                        tabBarLabel: 'Ustawienia',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="cog" color={color} size={25} />
                        ),
                    }} />
            </Tab.Navigator>
    );
};