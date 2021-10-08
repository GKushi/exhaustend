import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import ActivityRecognition from 'react-native-activity-recognition';
import uuid from 'react-native-uuid';

// LISTA LOKALIZACJI
export var coordinates = [];

export default function Statistics() {
  const [loc, setLocation] = useState();
  const [currentActivity, setCurrentActivity] = useState('no activity');
  const [polyLines, setPolyLines] = useState([]);
  const detectionIntervalMillis = 1000;

  // WŁĄCZA SIE PO PRZEJSCIU 50 metrów
  TaskManager.defineTask('background-location-task', ({ data: { locations }, error }) => {
    if (error) {
      return;
    }
    if (locations){
      coordinates = [...coordinates, ...[{latitude: locations[0].coords.latitude, longitude: locations[0].coords.longitude}]];
      console.log(locations)
      // Nie zapisuje nic - odswieza mape
      setLocation([]);

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
    
    if (currentActivity == 'STILL' && coordinates.length!=0){
      //setPolyLines(['#ff0000',0.00001,0])
      let myUuid = uuid.v4();
      setPolyLines([...polyLines, <Polyline
        key={myUuid}
        coordinates = {coordinates}
        strokeColor = '#ff0000'
        strokeWidth = {0}
      />])
      //console.log(coordinates)
      //console.log(coordinates[coordinates.length-1])
      //let last = coordinates[coordinates.length-1]
      //coordinates = []
      //coordinates.push(last)
    }
    if (currentActivity == 'WALKING' || currentActivity == 'ON_FOOT' || currentActivity == 'RUNNING' || currentActivity == 'ON_BICYCLE' && coordinates.length!=0){
      //setPolyLines(['#006600', 1, 3]);
      let myUuid = uuid.v4();
      setPolyLines([... polyLines, <Polyline
        key={myUuid}
        coordinates = {coordinates}
        strokeColor = '#006600'
        strokeWidth = {3}
      />])
      //console.log(coordinates)
      //console.log(coordinates[coordinates.length-1])
      //let last = coordinates[coordinates.length-1]
      //coordinates = []
      //coordinates.push(last)
    }
    if (currentActivity == 'IN_VEHICLE' || currentActivity == 'TILTING' && coordinates.length!=0){
      //setPolyLines(['#ff0000', 1, 3]);
      let myUuid = uuid.v4();
      setPolyLines([...polyLines, <Polyline
        key={myUuid}
        coordinates = {coordinates}
        strokeColor = '#ff0000'
        strokeWidth = {3}
      />])
      //console.log(coordinates)
      //console.log(coordinates[coordinates.length-1])
      //let last = coordinates[coordinates.length-1]
      //coordinates = []
      //coordinates.push(last)
    //console.log(coordinates)
    }
  }, [coordinates])

  useEffect(() => {
    if ( coordinates.length != 0 && coordinates.length !=1){
      //console.log(coordinates)
      let last = coordinates[coordinates.length-1]
      coordinates = []
      coordinates.push(last)
    }
  }, [currentActivity])

  return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress = {() => {setCurrentActivity('STILL'); console.log(currentActivity)}}
        >
          <Text>
            STILL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress = {() => {setCurrentActivity('WALKING'); console.log(currentActivity)}}
        >
          <Text>
            WALKING
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress = {() => {setCurrentActivity('IN_VEHICLE'); console.log(currentActivity)}}
        >
          <Text>
            IN_VEHICLE
          </Text>
        </TouchableOpacity>
        <Text>{currentActivity}</Text>

        <MapView 
          initialRegion={{
            latitude: 52.2400,
            longitude: 21.65825,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
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
        //...StyleSheet.absoluteFillObject,
        height: '75%',
        width: '100%',
      },
  });