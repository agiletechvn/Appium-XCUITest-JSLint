import React, { Component } from 'react';
import { Alert, Button } from 'react-native'
import {  
  Text,
  Input,
  View,  
} from 'native-base';

export default class XCUITest extends Component {

  render() {
    return (
      <View style={styles.container}>
        
        <Input placeholder="Username" testID="username" 
          style={styles.input}
          onChangeText={(username) => this.setState({username})} />  
        <Button title="Login" testID="login" 
          onPress={e=>Alert.alert('Username', this.state.username) && this.setState({username:''})}/>         

      </View>
    );
  }
}

const styles = {
  container: {    
    height: 80,
    width: '80%',
    alignSelf:'center',
    marginTop:100,
  },
  input:{
    borderWidth: 1,
  }
};