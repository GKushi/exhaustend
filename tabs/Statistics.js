import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import uuid from 'react-native-uuid';

// LISTA LOKALIZACJI
export var coordinates = [];
export var redDistance;
export var greenDistance;

export default function Statistics({setZ, setC, addRoute}) {
  //ODSWIEZANIE MAPY
  const [refresh, setRefresh] = useState();
  //LISTA POLYLINII
  const [polyLines, setPolyLines] = useState([]);
  //PREDKOSC SENSOR
  const [speed,setSpeed] = useState();
  const [currentActivity,setCurrentActivity] = useState('no activity');

  

  // WŁĄCZA SIE PO PRZEJSCIU 50 metrów
  TaskManager.defineTask('background-location-task', ({ data: { locations }, error }) => {
    if (error) {
      return;
    }
    if (locations){
      coordinates = [...coordinates, ...[{latitude: locations[0].coords.latitude, longitude: locations[0].coords.longitude}]];
      setSpeed(locations[0].coords.speed)
      // Nie zapisuje nic - odswieza mape
      setRefresh([]);

    }
  });
  // NAZWA FUNCKJI WYZEJ
  const LOCATION_TASK_NAME = 'background-location-task';

  // PYTA O PERMISJE, ZACZYNA SLEDZENIE LOKACJI
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 50
      })
    })();
  }, []);

  useEffect(() => {
    if(coordinates.length != 0){
      if (speed <= 1){
        let myUuid = uuid.v4();
        setPolyLines([...polyLines, <Polyline
          key={myUuid}
          coordinates = {coordinates}
          strokeColor = '#ff0000'
          strokeWidth = {0}
        />])
        setCurrentActivity('still')
      }
      if (speed > 1 && speed <9){
        let myUuid = uuid.v4();
        setPolyLines([... polyLines, <Polyline
          key={myUuid}
          coordinates = {coordinates}
          strokeColor = '#006600'
          strokeWidth = {3}
        />])
        if (coordinates.length != 0 && coordinates.length!=1){
          let tempLat1 = coordinates[coordinates.length-1].latitude;
          let tempLng1 = coordinates[coordinates.length-1].longitude;
          let tempLat2 = coordinates[coordinates.length-2].latitude;
          let tempLng2 = coordinates[coordinates.length-2].longitude;

          let dist = Math.sqrt(Math.pow(Math.abs(tempLat1-tempLat2),2) + Math.pow(Math.abs(tempLng1-tempLng2),2))*111;
          setC(0);
          setZ(dist);
          addRoute();
        }
        
        setCurrentActivity('walk')
      }
      if (speed >= 9){
        let myUuid = uuid.v4();
        setPolyLines([...polyLines, <Polyline
          key={myUuid}
          coordinates = {coordinates}
          strokeColor = '#ff0000'
          strokeWidth = {3}
        />])
        if (coordinates.length != 0 && coordinates.length!=1){
          let tempLat1 = coordinates[coordinates.length-1].latitude;
          let tempLng1 = coordinates[coordinates.length-1].longitude;
          let tempLat2 = coordinates[coordinates.length-2].latitude;
          let tempLng2 = coordinates[coordinates.length-2].longitude;

          let dist = Math.sqrt(Math.pow(Math.abs(tempLat1-tempLat2),2) + Math.pow(Math.abs(tempLng1-tempLng2),2))*111;
          setC(dist);
          setZ(0);
          addRoute();
        }
        setCurrentActivity('drive')
      }
    }
  }, [coordinates])

  useEffect(() => {
    if ( coordinates.length != 0 && coordinates.length!=1){
      let last = coordinates[coordinates.length-1]
      coordinates = []
      coordinates.push(last)
    }
  }, [currentActivity])

  return (
      <View style={styles.container}>
        <MapView 
          initialRegion={{
            latitude: 50.307614,
            longitude: 18.681170,
            latitudeDelta: 0.876986,
            longitudeDelta: 1.34811,
          }}
          style={styles.map}>
          {polyLines}
        </MapView>
      </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    paragraph: {
      fontSize: 18,
      textAlign: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
      },
  });