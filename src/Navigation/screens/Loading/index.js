import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

import { NavigationActions, StackActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

import database from '@react-native-firebase/database';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleImageFilter, initiateProducts, updateUserobj} from '../../../state/actions';

class Loading extends Component {
  
  componentDidMount() {

    this.props.navigation.navigate('CameraView')

    /*
    auth().onAuthStateChanged(user => {
      // **for the purpose of directly logging in if creds entered already
      
      // console.log("USERS: ");
      // console.log(user);

      if (user !== null){

        // user.updateProfile({
        //   photoURL: "https://icotar.com/avatar/data",
        //   displayName: "data collector"
        // })

        console.log(user)
        this.props.updateUserobj( { userObj: user } );
      }
      // console.log(this.props.products.userObj);

      const routeToGoTo = 'home';
      // const routeToGoTo = 'detailProduct';
      // const routeToGoTo = 'addProduct';
      // const routeToGoTo = 'addCategory';
      // const routeToGoTo = 'LiveStream';

      // this.props.navigation.navigate(routeToGoTo)

      // this.props.navigation.toggleDrawer()
      this.props.navigation.navigate(user ? routeToGoTo : 'login')

      // console.log("user: " + user);
      // database().ref("users/"+user.uid).set(
      //   {
      //     property1:"dallu",
      //     property2:"dallu",
      //     property3:"dallu",
      //     property4:"dallu",
      //   })

      // **For testing only
      // this.props.navigation.navigate('signup')

      // const routeToGoTo = 'addpage';
      // const routeToGoTo = 'home';
      
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({ routeName: routeToGoTo })],
      // });
      
      // this.props.navigation.dispatch(resetAction);
      
      

      // this.props.navigation.dispatch(DrawerActions.openDrawer());
    })

    */
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Text style={{color:'#6600ff', fontSize: 40}}>Loading</Text>
        <ActivityIndicator color='#6600ff' size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = (state) => {
  const { products } = state
  return { products }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    toggleImageFilter,
    initiateProducts,
    updateUserobj,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Loading);