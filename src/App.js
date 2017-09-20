import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import router from './router';
import routerConfig from './config/routerConfig';

let Router = StackNavigator(
  router, routerConfig
);

export default class App extends Component {
  render() {
    return (
      <Router ref={nav => { GLOBAL.navigation = nav }}/>
    );
  }
}