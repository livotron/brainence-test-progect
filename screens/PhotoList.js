import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import {styles} from '../styles';

export default class PhotoList extends Component {
  static navigationOptions = {
    title: 'PhotoList'
  };

 
  renderItem = ({item}) => {
    console.log(item);
    renderPhoto = (photo) => (
      <TouchableOpacity style={styles.item} 
      onPress={() => this.props.navigation.navigate('SinglePhoto',
      {photo : photo, logOut: this.props.navigation.state.params.logOut})}
      >      
        <Image
            style={styles.image}
            source={{uri: photo.thumbnailUrl}}
          />
          <Text>{photo.title}</Text>
      </TouchableOpacity>
    );
    return(
    <View style={styles.row}>
      {renderPhoto(item.leftPhoto)}
      {item.rightPhoto && renderPhoto(item.rightPhoto)}
    </View>
    )
  };
  render() {
    
    const { title, photos } = this.props.navigation.state.params.album;
    let rows = [];
    for (let i=0; i < photos.length; i = i + 2)
      rows.push({
      key: `${i}`, 
      leftPhoto: photos[i], 
      rightPhoto: photos.length < i + 2 ? null : photos[i + 1]
    });
    const keyedPhotos = photos.map(photo => ({ key:  `${photo.id}`, ...photo }));
    console.log(rows);
    console.log(keyedPhotos);
    return (<View styles={styles.gallery}>
      <Text>{title}</Text>
      <TouchableHighlight
          onPress={this.props.navigation.state.params.logOut}
        >
         <Text>Logout</Text>
      </TouchableHighlight>
        <FlatList
          styles={styles.container}
          data={rows}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
