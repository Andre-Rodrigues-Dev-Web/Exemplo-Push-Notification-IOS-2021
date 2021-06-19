import React, { Component } from 'react'
import { button, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

//Ios import
import { notificationManager } from './src/NotificationManager'




class App extends Component {
  constructor(props){
    super(props)
    this.localNotify = null
  }

  componentDidMount(){
    this.localNotify = notificationManager
    this.localNotify.configure()
  }

  onPressSendNotification = () => {
    this.localNotify.showNotification(
      1,
      "App Notification",
      "Local Notification",
      {},
      {}
    )
  }

  render() {
    let {container, buttonClick} = styles
    return (
      <View style={container}>
        <TouchableOpacity 
        style={buttonClick}
        onPress={this.onPressSendNotification}
        >
          <Text> Ativar PushNotification </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default App

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonClick: {
    alignItems: 'center',
    backgroundColor: 'black'
  }
})