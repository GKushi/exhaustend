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

export const db = openDatabase({
    name: "rn_sqlite",
  });

const Tab = createMaterialBottomTabNavigator();

export default function Footer(){

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
            barStyle={{ backgroundColor:'white', height:50}}
            screenOptions={{ headerShown: false}}
            >
                <Tab.Screen name="Home" 
                    children={()=> <Home renderRoute={renderRoute} routes={routes} />}
                    options={{
                    tabBarLabel: 'Strona Główna',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={25} />
                    ),
                    }}
                />
                <Tab.Screen name='map' component={Statistics} 
                    options={{
                    tabBarLabel: 'Mapa',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="map" color={color} size={25} />
                    ),
                    }}
                />
                <Tab.Screen name="Charity" component={Charity} 
                    options={{
                    tabBarLabel: 'Zbiórki',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="paw" color={color} size={25} />
                    ),
                    }}
                />
                <Tab.Screen name='Settings' component={Settings} 
                    options={{
                    tabBarLabel: 'Ustawienia',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cog" color={color} size={25} />
                    ),
                    }}
                />
            </Tab.Navigator>
    );
};