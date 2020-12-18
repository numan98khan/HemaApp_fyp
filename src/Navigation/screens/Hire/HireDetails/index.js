import React from 'react';
import { View, StyleSheet, Button, BackHandler, Alert, Text } from 'react-native';
import { TextInput, Picker, Platform ,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleImageFilter } from '../../../state/actions';

import ScreenName from '../../../components/ScreenName.js'
// import NavBar from '../../navigation/navBar'

import { Header, Icon, ButtonGroup, Avatar, Divider, Rating, AirbnbRating } from 'react-native-elements';
// import { withNavigation} from 'react-navigation';
import ImgDetailOverlay from '../../../components/imageDetailOverlay'
import ImagePicker from 'react-native-image-picker';
// import PhotoUpload from 'react-native-photo-upload'

import Slideshow from 'react-native-image-slider-show';

import ProductStyles from '../../../common/productStyle';

class HireDetails extends React.Component {

  // static navigationOptions = {

  // };

  // START
  static navigationOptions= {
    title: "Add",
    headerStyle: {
      backgroundColor: "#00ff80"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      textAlign: "center"
    },
  }
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      titleError:null,
      category: 'Mobiles',
      additionalInfo: '',
      categories: ['Mobiles', 'Laptops', 'Desktops', 'Others'],
      price:''
    }
  }

  


  componentDidMount() {
    
    }


  componentWillUnmount() {
    // this.backHandler.remove();
  }
  render() {
    const { navigation } = this.props;

    // this

    const hireObj = this.props.navigation.state.params.hireObj;

    let stateText = null;
    if (hireObj.state === "REQUESTED") {
        stateText = <Text style={ProductStyles.largeREQText}>{hireObj.state}</Text>
    } else if (hireObj.state === "REJECTED") { 
        stateText = <Text style={ProductStyles.largeREQText}>{hireObj.state}</Text>
    } else if (hireObj.state === "ACCEPTED") {
        stateText = <Text style={ProductStyles.largeREQText}>{hireObj.state}</Text>
    } else if (hireObj.state === "DISCARDED") {
        stateText = <Text style={ProductStyles.largeREQText}>{hireObj.state}</Text>
    }

    return (
        
      <View style={styles.container}>
      {/* <View > */}
      <ScrollView>
            <Text style={ProductStyles.headerText}>{hireObj.empEmail}</Text>
            {stateText}
            <Divider style={ProductStyles.dividerStyle} />
            <Text style={ProductStyles.descriptionHeader}>Message</Text>
            <Text style={ProductStyles.descriptionText}>{hireObj.message}</Text>
        </ScrollView>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  
  AvatarStyle:{
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "stretch",
    backgroundColor: '#ffffff',
  },
  control:{
    ...Platform.select({
      android:{
        height:40
      },
      ios:{
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'grey',
        marginTop:20,
        marginBottom:20
      }
    })
  },
  additionalInfo:{
    ...Platform.select({
      ios:{
        height:80
      }
    })
  }
});

const mapStateToProps = (state) => {
  const { products } = state
  return { products }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    toggleImageFilter
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HireDetails);