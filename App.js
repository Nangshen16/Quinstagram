import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import firebase from 'firebase/app';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'


//import all the config code from firebase.com
const firebaseConfig = {
  apiKey: "AIzaSyCLQPKXfUjcMbYUO7yWWlEjnfTVbXPSXEE",
  authDomain: "quinstagram-fc187.firebaseapp.com",
  projectId: "quinstagram-fc187",
  storageBucket: "quinstagram-fc187.appspot.com",
  messagingSenderId: "571502707474",
  appId: "1:571502707474:web:7c3690995f974b84b029cb",
  measurementId: "G-VDE3K4WYH5"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

//using react navigation
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initalRouteName="Landing">
        <Stack.Screen name = "Landing" component={LandingScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "Register" component={RegisterScreen}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}


