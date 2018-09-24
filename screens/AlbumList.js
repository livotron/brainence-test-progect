import React, { Component } from 'react';
import { View, Text, FlatList, Image , TouchableOpacity, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import {styles} from '../styles';

import { listAlbums, listPhotos, logOut } from '../reducer';

class AlbumList extends Component {
  static navigationOptions = {
    title: 'AlbumList'
  };

  componentWillMount() {
    this.props.listAlbums(this.props.navigation.state.params.id)
      .then((res) => {
        res.payload.data.map((album) => {
          this.props.listPhotos(album)
        })
      });
  }
  renderItem = ({ item }) => {
    renderAlbum = (album) => (
      <TouchableOpacity style={styles.item} 
       onPress={() => this.props.navigation.navigate('PhotoList',
       {album : album, logOut: this.props.logOut.bind(this)})}
      >  
        <Image
            style={styles.image}
            source={{uri: album.photos[album.titlePhotoIndex].thumbnailUrl}}
          />
          <Text>{album.title}</Text>
      </TouchableOpacity>
    );
    return(
    <View style={styles.row} >
      {renderAlbum(item.leftAlbum)}
      {item.rightAlbum && renderAlbum(item.rightAlbum)}
    </View>
  )};
  render() {
    
    const { albums } = this.props;

    let rows = [];
    for (let i = 0; i < albums.length; i = i + 2)
    rows.push({
    key: `${i}`, 
    leftAlbum: albums[i], 
    rightAlbum: albums.length < i + 2 ? null : albums[i + 1]
    
  });
    console.log(rows);
    return (<View>
        <Text>{'Hi, ' + this.props.user.name}</Text>
        <TouchableHighlight
          onPress={this.props.logOut.bind(this)}
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



const mapStateToProps = state => {
  let storedAlbums = state.filledAlbums.map(album => ({ key:  `${album.id}`, ...album }));
  return {
    albums: state.filledAlbums,
    user: state.user,
    filledAlbums: storedAlbums
  };
};

const mapDispatchToProps = {
  listAlbums,
  listPhotos,
  logOut
};
export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);