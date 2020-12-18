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

class ReviewDetails extends React.Component {

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
      price:'',
      tempNameSet:'',
      tempProductSet:'',
      
    }
  }

  componentDidMount() {
    this.props.products.dbh
      .ref('/products/'+this.props.navigation.state.params.review.productId)
      // .child('products')
      // .orderByChild('userId')
      // .equalTo(this.props.products.userObj.uid)
      .once("value", function(snapshot) {
        console.log(snapshot.val().name);

        this.setState({productReviewName:snapshot.val().name})

        // var fetchedCats = [];

        // snapshot.forEach(function(data) {
        //     console.log("skinny"+data.toJSON());
        //     // this.setState({productReviewName:})
        //     // fetchedCats.push(data.toJSON())
        // });
        // this.props.initiateProducts(
        //   {
        //       // dataSourceSearch: ds,
        //       dataSourceFilter: fetchedCats,
        //       // dataSourceDup: ds,
        //       loading: false,
        //     }
        //   );
    }.bind(this));

  }


  componentWillUnmount() {
    // this.backHandler.remove();
  }

  getNameFromId(userId){
    // console.log('users/'+userId)
    var eJSON;
    // console.log('transaction ' + this.props.products.dbh.ref('users/'+userId).transaction((FirstName) => {
    //   // if (currentViews === null) return 1;
    //   return FirstName.toJSON();
    // }))
    this.props.products.dbh.ref('users/'+userId).once('value', (e) => {
      eJSON = e.toJSON()
      console.log(eJSON);
      // console.log(eJSON.FirstName+' '+eJSON.LastName);
    //   this.setState({tempNameSet:eJSON.FirstName+' '+eJSON.LastName});
      this.setState({tempNameSet:eJSON.email});
    });
    return this.state.tempNameSet;
  }

  getProductFromId(productId){
    // console.log('users/'+userId)
    var eJSON;
    // console.log('transaction ' + this.props.products.dbh.ref('users/'+userId).transaction((FirstName) => {
    //   // if (currentViews === null) return 1;
    //   return FirstName.toJSON();
    // }))
    this.props.products.dbh.ref('products/'+productId).once('value', (e) => {
      eJSON = e.toJSON()
      console.log(eJSON.name);
      this.setState({tempProductSet:eJSON.name});
    });
    return this.state.tempProductSet;
  }

  render() {
    const { navigation } = this.props;

    // this

    const review = this.props.navigation.state.params.review;

    // <Text style={ProductStyles.headerText}>{this.getNameFromId(review.buyerId)}</Text>
            
    return (
        
      <View style={styles.container}>
      {/* <View > */}
      <ScrollView>
            <Text style={ProductStyles.headerText}>{review.buyerEmail}</Text>
            <Text style={ProductStyles.priceText}>{review.productId}</Text>
            <Text style={ProductStyles.priceText}>{this.state.productReviewName}</Text>
            <Divider style={ProductStyles.dividerStyle} />
            <Rating
                imageSize={20}
                readonly
                startingValue={review.rating}
                fractions="{1}"
                />
            <View style={{justifyContent: 'center', flexDirection:'row'}}>
                <Text style={ProductStyles.ratingText}>{review.rating}/5</Text>
            </View>
            <Divider style={ProductStyles.dividerStyle} />
            
            <Text style={ProductStyles.descriptionHeader}>Review</Text>
            <Text style={ProductStyles.descriptionText}>{review.review}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetails);