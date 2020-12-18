import React from 'react';
import { View, StyleSheet, BackHandler, Alert, Text } from 'react-native';
import {  Picker, Platform , ScrollView} from 'react-native';

import {Snackbar, TextInput, Card, Avatar, Button, Dialog, Portal, Title,List, Checkbox , Paragraph  } from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleImageFilter, initiateProducts } from '../../../../state/actions';

// import ScreenName from '../../../components/ScreenName.js'
// import NavBar from '../../navigation/navBar'
import database from '@react-native-firebase/database';

// import ImgDetailOverlay from '../../../components/imageDetailOverlay'
import ImagePicker from 'react-native-image-picker';
// import PhotoUpload from 'react-native-photo-upload'

import { Header, Icon, ButtonGroup, Divider, Rating, AirbnbRating } from 'react-native-elements';
// import { withNavigation} from 'react-navigation';

// import Slideshow from 'react-native-image-slider-show';

import ProductStyles from '../../../common/productStyle';

import storage from '@react-native-firebase/storage';
// import auth from '@react-native-firebase/auth';


class AddProduct extends React.Component {

  // static navigationOptions = {

  // };

  state = {
    price:null,
    itemName:'',
    itemDescription:'',
    visible: false,
    snackVisible: false,
    category:'NONE',
    snackMessage:'',
    itemImage:null,
    itemBrand:'',
    storageRef:null,
    categoryId:'',
  };

  // START
  // static navigationOptions= {
  //   title: "Add",
  //   headerStyle: {
  //     backgroundColor: "#00ff80"
  //   },
  //   headerTintColor: "#fff",
  //   headerTitleStyle: {
  //     fontWeight: "bold",
  //     textAlign: "center"
  //   },
  // }
  constructor(props) {
    super(props);
    // this.state = {
    //   title: '',
    //   titleError:null,
    //   category: 'Mobiles',
    //   additionalInfo: '',
    //   categories: ['Mobiles', 'Laptops', 'Desktops', 'Others'],
    //   price:'',
    //   itemName:'',
    //   itemDescription:''
    // }
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

  // END

  backAction = () => {
    if (this.isSaveable()){
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => this.props.navigation.goBack() }
      ]);
    } else {
      this.props.navigation.goBack()
    }
    return true;
  };

  getImages() {
    // let datasource = [];
  //   console.log(imgObj)
    // datasource.push({url: imgObj})
    // datasource.push({url:'http://placeimg.com/640/480/any'})
    // datasource.push({url:'http://placeimg.com/640/480/any'})
      // return datasource;
      // console.log(this.state.itemImages);
      return this.state.itemImages;
  }

  filterCatByUid(eJSON){
    var rowsCat = [{"description": "NONE", "name": "NONE"}];
    for(var i in eJSON){
      // console.log(this.props.products.userObj.uid + " " + eJSON[i].userId);
      if (this.props.products.userObj.uid === eJSON[i].userId) {
        // console.log('bih')
        // tempJSON = eJSON[i]
        // tempJSON["id"] = i;
        rowsCat.push(eJSON[i]);
      }
    }
    return rowsCat;
  }

  filterProdByUid(eJSON){
    var rowsCat = [];// = [{"description": "NONE", "name": "NONE"}];
    for(var i in eJSON){
      // console.log(this.props.products.userObj.uid + " " + eJSON[i].sellerId);
      // console.log('bih + ' + eJSON[i])
      if (this.props.products.userObj.uid === eJSON[i].sellerId) {
        // console.log('bih + ' + eJSON[i])
        tempJSON = eJSON[i]
        // tempJSON["id"] = i;
        rowsCat.push(tempJSON);
      }
    }
    return rowsCat;
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
    // connect to a Firebase table
    var dbref = this.props.products.dbh.ref('products');
    // save database reference for later
    // meat: this is where it all happens
    // dbref.on('value', (e) => {
    //     var rows = [];
    //     // console.log(e);
    //     eJSON = e.toJSON()
    //     for(var i in eJSON){
    //       tempJSON = eJSON[i]
    //       tempJSON["id"] = i;
    //       rows.push(tempJSON);
    //     }
    //     // console.log(rows[0])
    //     // var ds = rows;
    //     var ds = this.filterProdByUid(rows);

    //     this.props.products.dbh.ref('categories').on('value', (e) => {
    //       var rowsCat = [{"description": "NONE", "name": "NONE"}];
    //       eJSON = e.toJSON()
    //       for(var i in eJSON){
    //         var tempJSON = eJSON[i]
    //         tempJSON["id"] = i;
    //         rowsCat.push(tempJSON);
    //       }

    //       // console.log(this.filterCatByUid(rowsCat))
  
    //       var dsCat = this.filterCatByUid(rowsCat);
    //       // var dsCat = rowsCat;
    //       // console.log('>>>>>>>>>>>')
    //       // // console.log(ds[0])
    //       // console.log(dsCat)
    //       // console.log('>>>>>>>>>>>')
    //       this.props.initiateProducts(
    //         {
    //             dataSourceSearch: ds,
    //             dataSourceFilter: dsCat,
    //             dataSourceDup: ds,
    //              loading: false,
    //           }
    //         );
    //         // console.log(this.props.products.dataSourceSearch);
    //    });
    //  });
  
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
    pickImage()
    {
    // console.log("preeeee");
        const options= {
            noData:true
        }
        ImagePicker.launchImageLibrary(options, response => {
        // console.log("response", response);
        })
    }

  _showDialog = () => this.setState({ visible: true });
  _hideDialog = () => this.setState({ visible: false });

  _onToggleSnackBar = () => this.setState(state => ({ snackVisible: !state.snackVisible }));
  _onDismissSnackBar = () => this.setState({ snackVisible: false });

  isSaveable(){
    let dummyState = {
      price:null,
      itemName:'',
      itemImage:null,
      itemDescription:'',
      visible: false,
      category:'NONE',
      itemBrand:'',
      sellerId:null,
    };

    let isBool = true;

    if (this.state.price === null) {
      isBool = false;
    }
    if (this.state.itemName === '') {
      isBool = false;
    }
    if (this.state.itemDescription === '') {
      isBool = false;
    }
    if (this.state.category === 'NONE') {
      isBool = false;
    }
    if (this.state.itemBrand === '') {
      isBool = false;
    }

    console.log("wtttt "+this.props.products.userObj.uid)
    this.setState({sellerId: this.props.products.userObj.uid});
    console.log("wtttt "+this.state.sellerId)
    

  
    if (isBool){
      // var newProductRef = database()
      // .ref("products")
      // .push()

    // var storageRef = storage().ref('/images/products/' + this.state.itemImage.fileName);
    // storageRef.putFile(this.state.itemImage.path).then(function (snapshot) {
    //     console.log('Uploaded a data_url string!');
    // });

    // var firebaseUrl = "https://firebasestorage.googleapis.com/v0/b/" + this.props.products.bucket + "/o/";
    // // var finalUrl = firebaseUrl+'images%2Fproducts%2F' + this.state.itemImage.fileName;


    this.setState({sellerId: this.props.products.userObj.uid});
    console.log("wtttt "+this.props.products.userObj)
    var junk = this.state;

    this.state.storageRef.getDownloadURL().then(function(url) {
      console.log(url);
      console.log(this.state)
      // console.log(junk)
      
      database()
        .ref("products")
        .push()
        .set(
          {
            brand: junk.itemBrand,
            logo: "http://www.example.com/logo.png",
            name: junk.itemName,
            category: junk.category,
            categoryId: junk.categoryId,
            sellerId: this.props.products.userObj.uid,
            image: url,
            description: junk.itemDescription,
            price: junk.price,
            aggregateRating: {
              type: "aggregateRating",
              ratingValue: "0",
              reviewCount: "0"
            }
          })

  }.bind(this), function(error){
      console.log(error);
  });

      
      this.setState({ snackMessage: "Product added successfully." })
      this._onToggleSnackBar()
      this.setState({
        price:null,
        itemName:'',
        itemDescription:'',
        visible: false,
        category:'NONE',
        itemBrand:'',
        storageRef:null,
      })

    } else {
      this.setState({ snackMessage: "Please fill all the fields." })
      // if (this.state.category === 'NONE') {
      //   this.setState({ snackMessage: "Please choose a category." })
      // }
      this._onToggleSnackBar()
    }

    return isBool;
  }

  checkAndSet(price){
    if (isNaN(parseInt(price))){
      console.log('not int');
      this.setState({ snackMessage: "Please enter a numerical value" })
      this._onToggleSnackBar()
    } else {
      this.setState({ price })
    }
  }

  bazooka(){
  }

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
        
        this.setState({
          itemImage: tempsource,
        });
        
        this.state.storageRef = storage().ref('/images/products/' + this.state.itemImage.fileName);
        this.state.storageRef.putFile(this.state.itemImage.path).then(function (snapshot) {
            console.log('Uploaded a data_url string!');
            // console.log(this.state)
            // bazooka()
        });
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

  render() {

    

    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    // const [value, onChangeText] = React.useState('Useless Placeholder');
    const BackIcon = <Icon
                name='clear'
                color='#fff'
                type='material'
                onPress={() => this.props.navigation.navigate('home')} />
    const TitleView = <View style={{ flexDirection: 'row', justifyContent: 'space-between', width:100 }}>
                          <Text>Add Product</Text>
                      </View>
    
            //           <Image
            //   style={{height: '40%'}}
            //   source={{
            //     uri: this.state.itemImage ? this.state.itemImage.uri : 'https://reactnative.dev/img/tiny_logo.png',
            //   }}
            // />
    return (
      <View style={styles.container}>
      {/* <View > */}
      <Snackbar
        visible={this.state.snackVisible}
        onDismiss={this._onDismissSnackBar}
        duration={1000}
        action={{
          label: 'Ok',
          onPress: () => {
            this._onDismissSnackBar()
          },
        }}
        style={{width:'100%', marginHorizontal:'6.2%'}}
      >
      {this.state.snackMessage}
    </Snackbar>
      <ScrollView>

          <Card style={styles.cardContainer}>
            <Card.Title title="Product Image" titleStyle={styles.purpDreams} />
            <Card.Cover source={{ uri: this.state.itemImage ? this.state.itemImage.uri : 'https://reactnative.dev/img/tiny_logo.png' }} />
          </Card>            
            

            <View style={{justifyContent: 'center', flexDirection:'row'}}>
              <Button 
                // icon="plus" 
                mode="contained"
                color="#6600ff"
                style={{marginVertical:'3%', marginTop:'5%', width:'100%'}} 
                onPress={() => this.uploadImages()}>
                  Add Image              
              </Button>  
            </View>
            
            <TextInput
              selectionColor='#6600ff'
              // mode='outlined'
              label='Product Name'
              value={this.state.itemName}
              onChangeText={itemName => this.setState({ itemName })}
              style={{marginVertical:'2%'}}
            />

            <TextInput
              selectionColor='#6600ff'
              // mode='outlined'
              label='Product Brand'
              value={this.state.itemBrand}
              onChangeText={itemBrand => this.setState({ itemBrand })}
              style={{marginVertical:'2%'}}
            />
            
            <TextInput
              selectionColor='#6600ff'
              // mode='outlined'
              label='Price'
              value={this.state.price}
              onChangeText={price => this.checkAndSet(price)}
              style={{marginVertical:'2%'}}
            />

            <List.Section title="Category" titleStyle={{color:'#6600ff'}}>
              <List.Accordion
                title={this.state.category}
              >
              {
                // list.map((l, i) => (
                this.props.products.dataSourceFilter.map((l, i) => (
                  <List.Item
                    title={l.name}
                    onPress={category => {
                      console.log(l)
                      this.setState({category:l.name, categoryId: l.id})
                    }}
                  />
                ))
              }
              </List.Accordion>
            </List.Section>

            <Divider style={ProductStyles.dividerStyle} />
            <TextInput
              selectionColor='#6600ff'
              mode='outlined'
              multiline={true}
              label='Description'
              value={this.state.itemDescription}
              onChangeText={itemDescription => this.setState({ itemDescription })}
              style={{marginBottom:'10%'}}
            />

            <View style={{justifyContent: 'center', flexDirection:'row'}}>
              <Button 
                // icon="cancel" 
                mode="contained" 
                color="#6600ff"
                style={{marginVertical:'3%', marginHorizontal:'2%', width:'40%'}}
                onPress={() => this.props.navigation.goBack()}>
                  Discard
              </Button>
              <Button 
                // icon="plus" 
                mode="contained"
                color="#6600ff"
                style={{marginVertical:'3%', marginHorizontal:'2%', width:'40%'}} 
                onPress={() => this.isSaveable()}>
                  Add              
              </Button>
            </View>
          </ScrollView>
          
          
      </View>
    );
  }
}

// <Text style={ProductStyles.headerText}>item.name</Text>
// <Text style={ProductStyles.categoryText}>item.category</Text>
// <Text style={ProductStyles.priceText}>Price</Text>
            

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
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
    toggleImageFilter,
    initiateProducts
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);