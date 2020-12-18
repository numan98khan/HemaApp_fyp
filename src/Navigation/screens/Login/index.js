

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import styles from './style'
// import { TextInput } from 'react-native-paper';

import { NavigationActions } from 'react-navigation';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  navigateToScreen = ( route ) =>(
      () => {
      const navigateAction = NavigationActions.navigate({
          routeName: route
      });
      this.props.navigation.dispatch(navigateAction);
  })

  signOutUser = async () => {
      try {
          await auth().signOut();
          this.navigateToScreen("loading")
          // navigate('Auth');
      } catch (e) {
          console.log(e);
      }
  }

  isBlocked(){
    auth().onAuthStateChanged(user => {

      console.log("Debug 1")
      console.log(user)

      if (user !== null){


        database()
          .ref('/')
          .child('blocks')
          .orderByChild('userid')
          .equalTo(user.uid)
          .on("value", function(snapshot) {
            // uHrYlhp39KS7Bsl5FYsSQzm9m8x2  
          // console.log(snapshot);
            var orderList = [];
            console.log('Debug 2')
            console.log(user.uid)
            console.log(snapshot.val())
              
            snapshot.forEach(function(data) {
              console.log(data.val().userid)
              if (data.val().userid === user.uid){
                // this.signOutUser()
                auth().signOut();
                this.setState({ errorMessage: "You are blocked!!!" })
              }
              orderList.push(data.val());
            }.bind(this));
              // this.setState({orderList: orderList});
              // this.countTotalSpending();
              // this.orderProducts();
              // console.log(orderList)
        }.bind(this));   
      }
    })
  }

  handleLogin = () => {
    const { email, password } = this.state
      auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.isBlocked())
      // .then(() => this.props.navigation.navigate('main'))
     .catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:'#6600ff', fontSize: 40}}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: '#6600ff' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" color="#6600ff" onPress={this.handleLogin} />
        <View>
        <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('signup')} style={{color:'#6600ff', fontSize: 18}}> Sign Up </Text></Text>
        </View>
      </View>
    )
  }
}