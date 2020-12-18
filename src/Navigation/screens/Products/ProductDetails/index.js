import React from 'react';
import { View, StyleSheet, TouchableOpacity, Button, BackHandler, Clipboard, Alert, Text } from 'react-native';
import { TextInput, Picker, Platform ,ScrollView} from 'react-native';

import { Card } from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleImageFilter } from '../../../../state/actions';

// import ScreenName from '../../../components/ScreenName.js'
// import NavBar from '../../navigation/navBar'

import { Header, Icon, ButtonGroup, Avatar, Divider, Rating, AirbnbRating } from 'react-native-elements';
// import { withNavigation} from 'react-navigation';
// import ImgDetailOverlay from '../../../components/imageDetailOverlay'
import ImagePicker from 'react-native-image-picker';
// import PhotoUpload from 'react-native-photo-upload'

// import Slideshow from 'react-native-image-slider-show';

import ProductStyles from '../../../common/productStyle';

class ProductDetails extends React.Component {

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

  handleSubmit = () => {
    let {
      title,
      category,
      additionalInfo,
      price
    } = this.state;
    if(!title){
      this.setState({titleError:'Title is required'})
      return;
    }
    fetch(`${URI}/products`, {
      body: JSON.stringify({
        title,
        category,
        additionalInfo,
        price
      }),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
    }).then(p => {Alert.alert('Success','Product Saved Successfully')})
  }

  renderCategories = () => {
    return this.state.categories.map(c => <Picker.Item key={c} label={c} value={c} />)
  }


  componentDidMount() {
  }

  getImages(imgObj) {
      let datasource = [];
    //   console.log(imgObj)
      datasource.push({url: imgObj})
      datasource.push({url:'http://placeimg.com/640/480/any'})
      datasource.push({url:'http://placeimg.com/640/480/any'})
        return datasource;
    }

  componentWillUnmount() {
    // this.backHandler.remove();
  }
    pickImage()
    {
      ("preeeee");
        const options= {
            noData:true
        }
        ImagePicker.launchImageLibrary(options, response => {
        // console.log("response", response);
        })
    }

    copyToClipboard = () => {
      Clipboard.setString('hello world')
    }

  render() {
    const { navigation } = this.props;

    // this

    const item = this.props.navigation.state.params.item;

    const BackIcon = <Icon
                name='clear'
                color='#fff'
                type='material'
                onPress={() => this.props.navigation.navigate('home')} />
    const TitleView = <View style={{ flexDirection: 'row', justifyContent: 'space-between', width:100 }}>
                          <Text>Add Product</Text>
                      </View>
    return (
        
      <View style={styles.container}>
      {/* <View > */}
      <ScrollView>
            
            <Card style={styles.cardContainer}>
              <Card.Title title="Product Image" titleStyle={styles.purpDreams} />
              <Card.Cover source={{ uri: item.image }} />
            </Card>   
      
            <Text style={ProductStyles.headerText}>{item.name}</Text>
            <TouchableOpacity onPress={() => Clipboard.setString(item.id)}>
              <Text>Click here to copy product ID</Text>
            </TouchableOpacity>
            <Text style={ProductStyles.categoryText}>{item.category}</Text>
            <Text style={ProductStyles.priceText}>Price</Text>
            <Divider style={ProductStyles.dividerStyle} />
            <Rating
                imageSize={20}
                readonly
                startingValue={item.aggregateRating.ratingValue}
                fractions="{1}"
                />
            <View style={{justifyContent: 'center', flexDirection:'row'}}>
                <Text style={ProductStyles.ratingText}>{item.aggregateRating.ratingValue}/5</Text>
            </View>
            <View style={{justifyContent: 'center', flexDirection:'row'}}>
                <Text style={ProductStyles.ratingCount}>{item.aggregateRating.reviewCount} Reviews</Text>
            </View>
            <Divider style={ProductStyles.dividerStyle} />
            <Text style={ProductStyles.descriptionHeader}>Description</Text>
            <Text style={ProductStyles.descriptionText}>{item.description}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);