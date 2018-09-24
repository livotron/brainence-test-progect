import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import {Stack} from '../App';
import { connect } from 'react-redux';
import { getUser, updateUserIdInput } from '../reducer';

class Profile extends Component {
 
  static navigationOptions = {
    title: 'Profile'
  };
  
  handleTextChange (text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            alert("please enter numbers only");
        }
    }
    this.props.updateUserIdInput(newText);
  }
  handleButtonPres() {
    this.props.getUser(this.props.userIdInput)
      .then((res) => {
        if(res.payload && res.payload.data.name)
        this.props.navigation.navigate('AlbumList',{id : this.props.userIdInput});
      })
    
  }
  render() {
    const { loadingProfile } = this.props;
    //if (loadingProfile) return <Text>Loading...</Text>;
    // const { name, id } = user;
    return (
      <View>
      <TextInput
          style={{height: 40}}
          placeholder="Type user ID here!"
          onChangeText={(text) => this.handleTextChange(text)}
          keyboardType = 'numeric'
          value={this.props.userIdInput}
        />
        <Button
            onPress={() => this.handleButtonPres()}
            title="Confirm ID"
        />
        {loadingProfile &&
          <Text>Loading...</Text>
        }  
      </View>
    );
  }
}

const mapStateToProps = ({ userIdInput, user, loadingProfile }) => ({
  userIdInput,
  user,
  loadingProfile
});

const mapDispatchToProps = {
  getUser,
  updateUserIdInput
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);