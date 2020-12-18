import React, { Component} from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground, Dimensions  } from 'react-native'
// import { white } from 'ansi-colors';

import { Header, Icon, ButtonGroup } from 'react-native-elements';

import { Avatar } from 'react-native-elements';
// import ToggleSwitch from 'toggle-switch-react-native';

// import mainColor from '../components/colors';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts, 
        toggleFilter, updateScreenVar,
      toggleMode  } from '../state/actions';

import auth from '@react-native-firebase/auth';

class drawerContentComponents extends Component {

    signOutUser = async () => {
        try {
            await auth().signOut();
            this.navigateToScreen("loading")
            // navigate('Auth');
        } catch (e) {
            console.log(e);
        }
    }

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

  render() {
    const windowHeight = Dimensions.get('window').height;
    
    // console.log('photoURL : ', this.props.products.userObj.photoURL)

    var leftContainer;
    if (this.props.products.appMode === 'buyer'){
        leftContainer = <View style={styles.screenContainer}>
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Products') ? styles.activeBackgroundColor : null]}>
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Products') ? styles.selectedTextStyle : null]} 
                onPress={
                    this.navigateToScreen('Products')}>Products</Text>
            </View>
            {/*
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Cart') ? styles.activeBackgroundColor : null]}>
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Cart') ? styles.selectedTextStyle : null]} 
                onPress={this.navigateToScreen('Cart')}>Cart</Text>
            </View>
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Offers') ? styles.activeBackgroundColor : null]}>
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Offers') ? styles.selectedTextStyle : null]} 
                onPress={this.navigateToScreen('Offers')}>Offers</Text>
            </View>
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Reviews') ? styles.activeBackgroundColor : null]}>
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Reviews') ? styles.selectedTextStyle : null]} 
                onPress={this.navigateToScreen('Reviews')}>Reviews</Text>
            </View>
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Live') ? styles.activeBackgroundColor : null]}>
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Live') ? styles.selectedTextStyle : null]} 
                onPress={this.navigateToScreen('Live')}>Live Stream</Text>
            </View>
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Statistics') ? styles.activeBackgroundColor : null]}>
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Statistics') ? styles.selectedTextStyle : null]} 
                onPress={this.navigateToScreen('Statistics')}>Statistics</Text>
            </View>*/}
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Logout') ? styles.activeBackgroundColor : null]}>
                <Text style={{
                    fontSize: 20,
                    marginLeft: 20, 
                    textAlign: 'center',
                    color:'red'
                }} 
                onPress={this.signOutUser}>Logout</Text>
            </View>
        </View>
    } else {
        leftContainer = <View style={styles.screenContainer}>
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Products') ? styles.activeBackgroundColor : null]}>
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Products') ? styles.selectedTextStyle : null]} 
                onPress={
                    this.navigateToScreen('Products')}>Friends</Text>
            </View>
            {/*
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Category') ? styles.selectedTextStyle : null]} 
                onPress={this.navigateToScreen('Category')}>Category</Text>
            </View>
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Reviews') ? styles.activeBackgroundColor : null]}>
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Reviews') ? styles.selectedTextStyle : null]} 
                onPress={this.navigateToScreen('Reviews')}>Reviews</Text>
            </View>
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Live') ? styles.activeBackgroundColor : null]}>
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Live') ? styles.selectedTextStyle : null]} 
                onPress={this.navigateToScreen('Live')}>Live Stream</Text>
            </View>
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Statistics') ? styles.activeBackgroundColor : null]}>
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Statistics') ? styles.selectedTextStyle : null]} 
                onPress={this.navigateToScreen('Statistics')}>Statistics</Text>
            </View>
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Hire') ? styles.activeBackgroundColor : null]}>
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Hire') ? styles.selectedTextStyle : null]} 
                onPress={this.navigateToScreen('Hire')}>Hire</Text>
            </View>
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Credit') ? styles.activeBackgroundColor : null]}>
                <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Credit') ? styles.selectedTextStyle : null]} 
                onPress={this.navigateToScreen('Credit')}>Credit</Text>
            </View>
        */}
            <View style={[styles.screenStyle, (this.props.activeItemKey=='Logout') ? styles.activeBackgroundColor : null]}>
                <Text style={{
                    fontSize: 20,
                    marginLeft: 20, 
                    textAlign: 'center',
                    color:'red'
                }} 
                onPress={this.signOutUser}>Logout</Text>
            </View>
        </View>
        
    }

    // console.log("kanjar "+mainColor);
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <ImageBackground 
                    source={require('./assets/blue_cover.jpg')} 
                    style={{flex:1, width: 250, alignItems: 'center'}} >
                    <Avatar
                        size={"large"}
                        rounded
                        source={{
                        uri:
                            this.props.products.userObj.photoURL
                        }}
                        containerStyle={{justifyContent:'center', marginTop:windowHeight*0.03}}
                    />
                    <Text style={styles.headerText}>{this.props.products.userObj.displayName}</Text>
                </ImageBackground>
            </View>
            
            {leftContainer}

            <View style={styles.toggleButtonStyle}>
            
                {/*<ToggleSwitch
                    isOn={this.props.products.appMode == 'seller' ? true : false}
                    onColor="#6600ff"
                    offColor="gray"
                    size="small"
                    onToggle={isOn => this.props.toggleMode() }
                />*/}
            </View>
        </View>
        
    )
  }
}

// console.log("changed to : ", isOn)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        textAlign:"center",
        padding: 10,
        color: '#fff8f8',
    },
    screenContainer: { 
        paddingTop: 20,
        paddingBottom: '110%',
        width: '100%',
    },
    toggleButtonStyle: {
        // height: '10%',
        // position: 'absolute',
        // bottom: 0,
        // paddingTop:500,
        // flexDirection: 'row',
        // alignItems: 'flex-start',
        // width: '20%',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20, 
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: '#6600ff'
    },
    activeBackgroundColor: {
        // backgroundColor: 'grey'
    }
});

const mapStateToProps = (state) => {
    const { products } = state
    return { products }
  };
  
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      updateProducts,
      initiateProducts,
      toggleFilter,
      updateScreenVar,
      toggleMode,
    }, dispatch)
  );
  
  export default connect(mapStateToProps, mapDispatchToProps)(drawerContentComponents);
  