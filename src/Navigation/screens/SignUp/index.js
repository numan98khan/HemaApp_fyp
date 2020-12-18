// import React from 'react'
// import { StyleSheet, Text, TextInput, View, Button,Alert } from 'react-native'
// import { firebase } from '@react-native-firebase/auth';
// console.reportErrorsAsExceptions = false; // copy paste this line in your App.js

// export default class SignUp extends React.Component {
//   state = { email: '', password: '', errorMessage: '' }
// handleSignUp = () => {
// firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then().catch(function(error) {
//  });
// }
// render() {
//     return (
//       <View style={styles.container}>
//         <Text>Sign Up</Text>
//           <Text style={{ color: 'red' }}>
//             {this.state.errorMessage}
//           </Text>
//         <TextInput
//           placeholder="Email"
//           autoCapitalize="none"
//           style={styles.textInput}
//           onChangeText={email => this.setState({ email })}
//           value={this.state.email}
//         />
//         <TextInput
//           secureTextEntry
//           placeholder="Password"
//           autoCapitalize="none"
//           style={styles.textInput}
//           onChangeText={password => this.setState({ password })}
//           value={this.state.password}
//         />
//         <Button title="Sign Up" onPress={this.handleSignUp} />
//         <Button
//           title="Already have an account? Login"
//           onPress={() => this.props.navigation.navigate('login')}
//         />
//       </View>
//     )
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   textInput: {
//     height: 40,
//     width: '90%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginTop: 8
//   }
// })

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity  } from 'react-native'
import styles from './style'

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import { Avatar } from 'react-native-elements';
// import { Avatar } from 'react-native-paper';

import ImagePicker from 'react-native-image-picker';

// var user = firebase.auth().currentUser;

// user.updateProfile({
//   displayName: "Jane Q. User",
//   photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(function() {
//   // Update successful.
// }).catch(function(error) {
//   // An error happened.
// });

export default class signUp extends React.Component {
  state = { email: '', 
          password: '',
          cPassword: '',
          displayName: '', 
          errorMessage: null,
          disabledButton: true,
          imageUploaded: false,
          itemImage:null }
  
  uploadImages(){
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: 'Select Images',
      customButtons: [{ name: 'clear', title: 'Clear images from cache' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', Object.keys(response));

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        this.setState({
          itemImage: null,
        });
      } else {
        let tempsource = response;
        
        // console.log(tempsource)
        
        // console.log(tempsource.uri)
        this.setState({
          itemImage: tempsource,
        });
        this.setState({imageUploaded: true})

        

        
        // tempsource.push( {url: response.uri} )

        // const source = tempsource;
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   itemImage: tempsource,
        // });
      }
    });
  }
        

  // stores user data in real-time db and moves on to main
  rtdbandcont = () => {
    // Add user info to DB

    auth().onAuthStateChanged(user => {
      // This function captures the user id and adds it to the db
      
      // if (user){

      console.log("oidwngewngoirnwopn")
        this.state.storageRef = storage().ref('/images/users/' + this.state.itemImage.fileName);
        this.state.storageRef.putFile(this.state.itemImage.path).then(function (snapshot) {
            console.log('Uploaded a data_url string!');
            this.setState({imageUploaded: true})
            
            this.state.storageRef.getDownloadURL().then(function(url) {
                console.log(url);
                // console.log(this.state)

                // auth().onAuthStateChanged(user => {
                  // This function captures the user id and adds it to the db
                  
                  user.updateProfile({
                    photoURL: url,
                    displayName: this.state.displayName
                  }).then(function() {
                    // Update successful.
                    auth().onAuthStateChanged(user => {
                      console.log('user image updated!!!')
                      console.log("user: " + user);
                      database().ref("users/"+user.uid).set(
                        {
                          displayName: user.displayName,
                          credit: 0,
                          email: user.email,
                          image: user.photoURL,
                        })
                    });
                    
                  }).catch(function(error) {
                    // An error happened.
                  });
                // }).bind(this)

                // console.log(junk)    
            }.bind(this), function(error){
                console.log(error);
            });
            
            // console.log(this.state)
            // bazooka()
        }.bind(this));

      // }
      
    })
    
    this.props.navigation.navigate('main')
  }
  
  getDisabled(){
    if (this.state.email !== '' && 
        this.state.password !== '' &&
        this.state.displayName !== ''){
          console.log(this.state.password, this.state.cPassword)
          if (this.state.password === this.state.cPassword){
            return false;
          } else {
            return true;
          }
    }
    return true;
  }

  handleSignUp = () => {
    console.log(auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.rtdbandcont())
    .catch(error => this.setState({ errorMessage: error.message })))
  }

render() {
    

    return (
      <View style={styles.container}>
      <Text style={{color:'#6600ff', fontSize: 40, marginBottom:'5%'}}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: '#6600ff' }}>
            {this.state.errorMessage}
          </Text>}
          { !this.state.imageUploaded ? (<Avatar size='xlarge' rounded 
                                          icon={{ name: 'image' }} 
                                          onPress={() => this.uploadImages()} />):
          (<Avatar size='xlarge' rounded
                    source={{uri: this.state.itemImage.uri}}
                   />)
          }
        
        <TextInput
          placeholder="Display Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={displayName => this.setState({ displayName })}
          value={this.state.displayName}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={cPassword => this.setState({ cPassword })}
          value={this.state.cPassword}
        />
        <Button disabled={this.getDisabled()} title="Sign Up" color="#6600ff" onPress={this.handleSignUp}/>
        <View>
        <Text> Already have an account? 
          <Text onPress = {() => this.props.navigation.navigate('login')} style={{color:'#6600ff', fontSize: 18}}> 
            Login 
          </Text>
        </Text>
        </View>
      </View>
    )
  }
}