import React from 'react';
import Home from '../tabs/Home';
import Charity from '../tabs/Charity';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Statistics from '../tabs/Statistics';
import Settings from '../tabs/Settings';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mainMotive, grey } from './colors';

const Tab = createMaterialBottomTabNavigator();

export default function Footer(){
    return(
            <Tab.Navigator
            initialRouteName="Home"
            activeColor={mainMotive}
            inactiveColor={grey}
            barStyle={{ backgroundColor:'white', height:50}}
            screenOptions={{ headerShown: false}}
            >
                <Tab.Screen name="Home" component={Home} 
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