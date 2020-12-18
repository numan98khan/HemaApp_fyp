import React from 'react';
import { View, StyleSheet, BackHandler, Alert, Text } from 'react-native';
import {  Picker, Platform ,ScrollView} from 'react-native';

import {Snackbar, TextInput, Card, Avatar, Button, Dialog, Portal, Title,List, Checkbox , Paragraph  } from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {toggleImageFilter, initiateProducts } from '../../../state/actions';

import ScreenName from '../../../components/ScreenName.js'
// import NavBar from '../../navigation/navBar'
import database from '@react-native-firebase/database';

import ImgDetailOverlay from '../../../components/imageDetailOverlay'
import ImagePicker from 'react-native-image-picker';
// import PhotoUpload from 'react-native-photo-upload'

import { Header, Icon, ButtonGroup, Divider, Rating, AirbnbRating } from 'react-native-elements';
// import { withNavigation} from 'react-navigation';

import Slideshow from 'react-native-image-slider-show';

import ProductStyles from '../../../common/productStyle';

class AddHire extends React.Component {

  // static navigationOptions = {

  // };

  state = {
    employeeEmail:'',
    employeeId:'',
    employerId:'',
    requestMessage:'',
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

  getUidByEmail(useremail){
    this.props.products.dbh.ref('users/').orderByChild('email').equalTo(useremail).once("value", function(snapshot) {
        // console.log(snapshot.val().key();
  
        snapshot.forEach(function(data) {
            // console.log(data.key);
            // this.setState({productID:'wow'});
            this.setState({employeeId:data.key.toString()});
            // console.log(">>>>>>>>>>> "+this.state.buyerId);
        }.bind(this));
    }.bind(this));
    return useremail;
  }

  onFocusFunction = () => {
    // do some stuff on every screen focus
    // this.props.updateScreenVar({screen:'hire'});
    this.setState({ employerId:this.props.products.userObj.uid })
    console.log("hire add focused");
  }

  // and don't forget to remove the listener
  componentWillUnmount () {
    this.focusListener.remove()
  }


  componentDidMount() {

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.onFocusFunction()
      })

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
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
        employeeEmail:'',
        employeeId:'',
        employerId:'',
        requestMessage:'',
        visible: false,
        snackVisible: false,
        snackMessage:'',
    };

    let isBool = true;

    if (this.state.employeeEmail === '') {
      isBool = false;
    }
    if (this.state.requestMessage === '') {
      isBool = false;
    }

    if (isSave){
      if (isBool){
        database()
        .ref("hire")
        .push()
        .set(
          {
            employerId: this.props.products.userObj.uid,
            employerEmail: this.props.products.userObj.email,
            employeeId: this.state.employeeId,
            state: 'REQUESTED',
            message: this.state.requestMessage,
            empEmail: this.state.employeeEmail,
          })
        this.setState({ snackMessage: "Requested successfully." })
        this._onToggleSnackBar()
        this.setState({
            employeeEmail:'',
            employeeId:'',
            employerId:'',
            requestMessage:'',
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
              label='User Email'
              value={this.state.employeeEmail}
              onChangeText={employeeEmail => this.setState({ employeeEmail:this.getUidByEmail(employeeEmail) })}
              style={{marginVertical:'2%'}}
            />
            
            <Divider style={ProductStyles.dividerStyle} />
            <TextInput
              selectionColor='#6600ff'
              mode='outlined'
              multiline={true}
              label='Message'
              value={this.state.requestMessage}
              onChangeText={requestMessage => this.setState({ requestMessage })}
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
                  Request              
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

export default connect(mapStateToProps, mapDispatchToProps)(AddHire);