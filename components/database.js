import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, TextInput, Button, FlatList } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";

export const db = openDatabase({
  name: "rn_sqlite",
});

const Database = () => {
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
  
  const getRouteById = (id) => {
    console.log("POBIERANIE REKORDU")
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM routes WHERE id = ?`,
        [id],
        (sqlTxn, res) => {
          console.log("Routes retrieved successfully");
          let len = res.rows.length;
          console.log(len)
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
    console.log(item.coords)
    return (
      <View style={{
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
      }}>
        <Text style={{ marginRight: 9 }}>{item.id}</Text>
        <Text style={{ marginRight: 9 }}>{item.activity}</Text>
        <Text>{item.coords}</Text>
      </View>
    );
  };

  useEffect(async () => {
    await createTables();
    await getRoutes();
  }, []);

  return (
    <View>
      <StatusBar backgroundColor="#222" />

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

      <FlatList
        data={routes}
        renderItem={renderRoute}
        key={cat => cat.id}
      />
    </View>
  );
};

export default Database;
