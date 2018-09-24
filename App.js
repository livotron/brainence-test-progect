import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { createStackNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import reducer from './reducer';
import AlbumList from './screens/AlbumList';
import PhotoList from './screens/PhotoList';
import SinglePhoto from './screens/SinglePhoto';
import Profile from './screens/Profile';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

export const Stack = createStackNavigator ({
  Profile: {
    screen: Profile
  },
  AlbumList: {
    screen: AlbumList
  },
  PhotoList: {
    screen: PhotoList
  },
  SinglePhoto: {
    screen: SinglePhoto
  }

},
{
  headerMode: 'none'
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Stack/>
        </View>
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30
  }
});