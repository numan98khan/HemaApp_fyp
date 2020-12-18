import React from 'react';
import { View, StyleSheet, BackHandler, Alert, Text } from 'react-native';
import {  Picker, Platform ,ScrollView} from 'react-native';

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

class AddCategory extends React.Component {

  // static navigationOptions = {

  // };

  state = {
    categoryName:'',
    categoryDescription:'',
    visible: false,
    snackVisible: false,
    snackMessage:'',
  };

  constructor(props) {
    super(props);
  }

  // END

  backAction = () => {
    if (this.isSaveable(false)){
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

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
    /**
    // connect to a Firebase table
    var dbref = this.props.products.dbh.ref('products');
    // save database reference for later
    //  this.props.products.setState ( {dbulref: dbref});
    // meat: this is where it all happens
     dbref.on('value', (e) => {
        var rows = [];
        // console.log(e);
        eJSON = e.toJSON()
        for(var i in eJSON){
          tempJSON = eJSON[i]
          tempJSON["id"] = i;
          rows.push(tempJSON);
        }
        // console.log(rows[0])
        var ds = rows;

        this.props.products.dbh.ref('categories').on('value', (e) => {
          var rowsCat = [{"description": "NONE", "name": "NONE"}];
          eJSON = e.toJSON()
          for(var i in eJSON){
            rowsCat.push(eJSON[i]);
          }
  
          var dsCat = rowsCat;
          // console.log('>>>>>>>>>>>')
          // // console.log(ds[0])
          // console.log(dsCat)
          // console.log('>>>>>>>>>>>')
          this.props.initiateProducts(
            {
                dataSourceSearch: ds,
                dataSourceFilter: dsCat,
                dataSourceDup: ds,
                 loading: false,
              }
            );
            // console.log(this.props.products.dataSourceSearch);
       });
     });
      */
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

  isSaveable(isSave){
    let dummyState = {
      categoryName:'',
      categoryDescription:'',
      visible: false,
      snackVisible: false,
      snackMessage:'',
    };

    let isBool = true;

    if (this.state.categoryName === '') {
      isBool = false;
    }
    if (this.state.categoryDescription === '') {
      isBool = false;
    }

    if (isSave){
      if (isBool){
        database()
        .ref("categories")
        .push()
        .set(
          {
            userId: this.props.products.userObj.uid,
            userEmail: this.props.products.userObj.email,
            name: this.state.categoryName,
            description: this.state.categoryDescription,
          })
        this.setState({ snackMessage: "Category added successfully." })
        this._onToggleSnackBar()
        this.setState({
          categoryName:'',
          categoryDescription:'',
          visible: false,
          snackVisible: false,
          snackMessage:'',
        })

      } else {
        this.setState({ snackMessage: "Please fill all the fields." })
        // if (this.state.category === 'NONE') {
        //   this.setState({ snackMessage: "Please choose a category." })
        // }
        this._onToggleSnackBar()
      }
    }

    return isBool;
  }

  // checkAndSet(price){
  //   if (isNaN(parseInt(price))){
  //     console.log('not int');
  //     this.setState({ snackMessage: "Please enter a numerical value" })
  //     this._onToggleSnackBar()
  //   } else {
  //     this.setState({ price })
  //   }
  // }

  render() {
    // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    // const [value, onChangeText] = React.useState('Useless Placeholder');
    // const BackIcon = <Icon
    //             name='clear'
    //             color='#fff'
    //             type='material'
    //             onPress={() => this.props.navigation.navigate('home')} />
    // const TitleView = <View style={{ flexDirection: 'row', justifyContent: 'space-between', width:100 }}>
    //                       <Text>Add Product</Text>
    //                   </View>
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
            <TextInput
              selectionColor='#6600ff'
              // mode='outlined'
              label='Category Name'
              value={this.state.categoryName}
              onChangeText={categoryName => this.setState({ categoryName })}
              style={{marginVertical:'2%'}}
            />
            
            <Divider style={ProductStyles.dividerStyle} />
            <TextInput
              selectionColor='#6600ff'
              mode='outlined'
              multiline={true}
              label='Description'
              value={this.state.categoryDescription}
              onChangeText={categoryDescription => this.setState({ categoryDescription })}
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
                onPress={() => this.isSaveable(true)}>
                  Add              
              </Button>
            </View>
          </ScrollView>
          
          
      </View>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);