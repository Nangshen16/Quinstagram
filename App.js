import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase/app';

import {Provider} from 'react-redux'
import {createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

const store = createStore( rootReducer, applyMiddleware(thunk))


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

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import MainScreen from './components/main';

//using react navigation
const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state= {
      loaded: false,
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,

        })

      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const {loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text >Loading</Text>
        </View>
      )

    }
    if(!loggedIn){
      return (
      
        <NavigationContainer>
          <Stack.Navigator initalRouteName="Landing">
            <Stack.Screen name = "Landing" component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name = "Register" component={RegisterScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
    
      );

    }
    return(
      <Provider store= {store}>
        <MainScreen/>

      </Provider>
      
      
    )
    
      
        
    
    
  }
}

export default App




