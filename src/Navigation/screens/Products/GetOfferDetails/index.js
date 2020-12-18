import React from 'react';
import { View, StyleSheet, BackHandler, Alert, Text } from 'react-native';
import { TextInput, Picker, Platform ,ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleImageFilter } from '../../../state/actions';


import {Button  } from 'react-native-paper';


// import ScreenName from '../../../components/ScreenName.js'
// import NavBar from '../../navigation/navBar'

import { Header, Icon, ButtonGroup, Avatar, Divider, Rating, AirbnbRating } from 'react-native-elements';
// import { withNavigation} from 'react-navigation';
// import ImgDetailOverlay from '../../../components/imageDetailOverlay'
// import ImagePicker from 'react-native-image-picker';
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


  declineOffer(hireObj){
    const reference = this.props.products.dbh.ref(`/offers/${hireObj.id}/status`);

    // Execute transaction
    return reference.transaction(currentLikes => {
      // if (currentLikes === null) return 1;
      return "REJECTED";
    });
  }

  acceptOffer(hireObj){
    const reference = this.props.products.dbh.ref(`/offers/${hireObj.id}/status`);

    var result = this.props.products.dataSourceDup.filter(obj => {
      return obj.id === hireObj.productId
    })

    // console.log(result[0])
    var d = new Date();
    database()
      .ref("orders")
      .push()
      .set(
        {
          bill: result[0].price,
          buyerId: result[0],
          sellerId: this.props.products.userObj.uid, 
          product: result[0].productId,
          createdAt: Math.round(d.getTime() / 1000),
          // productList: pList,
        })
      console.log('boomer')
      const referenceNew = database().ref(`/users/${this.props.products.userObj.uid}/credit`);
      
      var tempProdCap = result[0].price;
      referenceNew.transaction(credit => {
        // console.log('DOOBIE '+reviewCount.ratingValue, reviewCount.reviewCount);
        return credit+tempProdCap.price;
      });

    // Execute transaction
    return reference.transaction(currentLikes => {
      // if (currentLikes === null) return 1;
      return "ACCEPTED";
    });

  }
  


  componentDidMount() {
    
    }


  componentWillUnmount() {
    // this.backHandler.remove();
  }
  render() {
    const { navigation } = this.props;

    // this

    const offerObj = this.props.navigation.state.params.offerObj;
    console.log(offerObj)

    // console.log("dlbwngk : "+this.props.products.dataSourceDup[0].name)
    var result = this.props.products.dataSourceDup.filter(obj => {
      return obj.id === "-M4g6ifSMTQ5ZovvEBjZ"
    })

    console.log(result[0])

    let stateText = null;
    if (offerObj.status === "PENDING") {
        stateText = <Text style={ProductStyles.largeREQText}>{offerObj.status}</Text>
    } else if (offerObj.status === "REJECTED") { 
        stateText = <Text style={ProductStyles.largeREJText}>{offerObj.status}</Text>
    } else if (offerObj.status === "ACCEPTED") {
        stateText = <Text style={ProductStyles.largeACCText}>{offerObj.status}</Text>
    } else if (offerObj.status === "DISCARDED") {
        stateText = <Text style={ProductStyles.largeDISText}>{offerObj.status}</Text>
    }

    return (
        
      <View style={styles.container}>
      {/* <View > */}
      <ScrollView>
            <Text style={ProductStyles.headerText}>{offerObj.productName}</Text>
            {stateText}
            <Divider style={ProductStyles.dividerStyle} />
            <Text style={ProductStyles.descriptionHeader}>Price Offer:</Text>
            <Text style={ProductStyles.descriptionText}>{offerObj.price}</Text>
            { offerObj.status === "PENDING" ?
            (<View style={{justifyContent: 'center', flexDirection:'row'}}>
              <Button 
                // icon="cancel" 
                mode="contained" 
                color="#6600ff"
                style={{marginVertical:'3%', marginHorizontal:'2%', width:'40%'}}
                onPress={() => this.declineOffer(offerObj)}>
                  Decline
              </Button>
              <Button 
                // icon="plus" 
                mode="contained"
                color="#6600ff"
                style={{marginVertical:'3%', marginHorizontal:'2%', width:'40%'}} 
                onPress={() => this.acceptOffer(offerObj)}>
                  Accept              
              </Button>
            </View>) : (null)
            }
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