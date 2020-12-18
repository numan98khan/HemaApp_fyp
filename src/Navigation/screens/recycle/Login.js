// import React from 'react'
// import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
// import { firebase } from '@react-native-firebase/auth';
// export default class Login extends React.Component {
//   state = { email: '', password: '', errorMessage: null }
//   handleLogin = () => {
//     // TODO: Firebase stuff...
//     const { email, password } = this.state
//         firebase
//           .auth()
//           .signInWithEmailAndPassword(email, password)
//           .then(() => this.props.navigation.navigate('main'))
//           .catch(error => this.setState({ errorMessage: error.message }))
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Login</Text>
//         {this.state.errorMessage &&
//           <Text style={{ color: 'red' }}>
//             {this.state.errorMessage}
//           </Text>}
//         <TextInput
//           style={styles.textInput}
//           autoCapitalize="none"
//           placeholder="Email"
//           onChangeText={email => this.setState({ email })}
//           value={this.state.email}
//         />
//         <TextInput
//           secureTextEntry
//           style={styles.textInput}
//           autoCapitalize="none"
//           placeholder="Password"
//           onChangeText={password => this.setState({ password })}
//           value={this.state.password}
//         />
//         <Button title="Login" onPress={this.handleLogin} />
//         <Button
//           title="Don't have an account? Sign Up"
//           onPress={() => this.props.navigation.navigate('signup')}
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
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import styles from './style'

import auth from '@react-native-firebase/auth';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    const { email, password } = this.state
      auth()
      .signInWithEmailAndPassword(email, password)
    //  .then(() => this.props.navigation.navigate('main'))
    .then(() => this.onLoginSuccess.bind(this))
     .catch(error => this.setState({ errorMessage: error.message }))
  }

  onLoginSuccess = () =>{
    {
        const navigateAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'Routes' })]
        })
        this.props.navigation.dispatch(navigateAction)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:'#e93766', fontSize: 40}}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
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
        <Button title="Login" color="#e93766" onPress={this.handleLogin} />
        <View>
        <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('signup')} style={{color:'#e93766', fontSize: 18}}> Sign Up </Text></Text>
        </View>
      </View>
    )
  }
}