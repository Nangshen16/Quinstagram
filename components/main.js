import React, { Component } from 'react'
import {View, Text} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';
import FeedScreen from './main/Feed';

const Tab = createMaterialBottomTabNavigator();


export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();


    }
    render() {
       
       
        return (
            
                <Tab.Navigator>
                  <Tab.Screen name="Feed" component={FeedScreen}
                  options={{
                      tabBarIcon: ({color, size}) => (
                          <MaterialCommunityIcons name="home" color={color} size={26}/>
                      ),
                  }} />
                </Tab.Navigator>
            
            
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)


export default connect(null, mapDispatchProps)(Main);