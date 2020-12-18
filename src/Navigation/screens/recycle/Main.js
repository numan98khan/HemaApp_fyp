import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'

export default class Home extends React.Component {
  state = { currentUser: null }
render() {
    const { currentUser } = this.state
return (
      <View style={styles.container}><Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <Button title="Live Stream" onPress={() => this.props.navigation.navigate('livestream')} />
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})