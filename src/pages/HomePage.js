import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Touch from '../components/Touch';
import navigation from '../utils/navigation';

export default class HomePage extends Component {

  static navigationOptions = {
    title: 'Home',
    headerLeft: <View/>
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/img/app-icon.png')} style={{width: 80, height: 80}}/>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit src/App.js
        </Text>
        <Touch onPress={()=>navigation.navigate('Example')}>
          <Text>Click here to dva demo</Text>
        </Touch>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});