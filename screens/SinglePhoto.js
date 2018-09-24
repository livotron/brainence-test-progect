import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import {styles} from '../styles';
export default class SinglePhoto extends Component {
  static navigationOptions = {
    title: 'SinglePhoto'
  };

  render() {
    
    const { title, url } = this.props.navigation.state.params.photo;
    return (<View style={styles.container}>
      <Text>{title}</Text>
      <TouchableHighlight
          onPress={this.props.navigation.state.params.logOut}
        >
         <Text>Logout</Text>
      </TouchableHighlight>
      <Image
          style={{width: '100%',height: '100%',resizeMode: 'contain',  backgroundColor: '#ccc',}}
          source={{uri: url}}
        />
      </View>
    );
  }
}
