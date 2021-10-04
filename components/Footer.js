import React from 'react';
import Home from '../tabs/Home';
import Charity from '../tabs/Charity';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Statistics from '../tabs/Statistics';
import Settings from '../tabs/Settings';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createMaterialBottomTabNavigator();

export default function Footer(){
    return(
            <Tab.Navigator
            initialRouteName="Home"
            activeColor='#269450'
            inactiveColor='#414c45'
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
                <Tab.Screen name="Charity" component={Charity} 
                    options={{
                    tabBarLabel: 'Zbiórki',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="paw" color={color} size={25} />
                    ),
                    }}
                />
                <Tab.Screen name='Statistics' component={Statistics} 
                    options={{
                    tabBarLabel: 'Statystyki',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="chart-line" color={color} size={25} />
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