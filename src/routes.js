import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ManageProducts from './pages/ManageProducts';
import AddProduct from './pages/AddProduct';
import AddOrder from './pages/AddOrder';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator({
      Sign: createSwitchNavigator({
        SignIn,
        SignUp
      }),
      App: createBottomTabNavigator({
        Dashboard,
        AddOrder,
        Profile: {
          screen: createStackNavigator({
            Profile,
            ManageProducts,
            AddProduct
          }, {
            defaultNavigationOptions: {
              headerTransparent: true,
              title: ''
            }
          }),
          navigationOptions: {
            tabBarLabel: 'Meu perfil',
            tabBarIcon: ({ tintColor }) => <Icon name="person" size={20} color={tintColor} />
          }
        }
      }, {
        tabBarOptions: {
          keyboardHidesTabBar: true,
          activeTintColor: '#f50057',
          inactiveTintColor: 'rgba(0,0,0,.3)',
          style: {
            backgroundColor: 'white'
          }
        }
      })
    }, {
      initialRouteName: signedIn ? 'App' : 'Sign'
    })
  );
