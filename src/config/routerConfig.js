import React, { Component } from 'react';
import {Platform, View} from 'react-native';
import colors from '../utils/colors';

export default {
  initialRouteName: 'Home',
  navigationOptions: {
    headerTintColor: 'white',
    headerTruncatedBackTitle: null,
    headerRight: (
      Platform.OS==='ios'?null:<View/>
    ),
    headerStyle: {
      backgroundColor: colors.defaults.title
    },
    headerTitleStyle: Platform.OS==='ios'?{}:{
        position: 'absolute',
        alignSelf: 'center',
      }
  }
};