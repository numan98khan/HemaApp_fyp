// import React from 'react';
// import { View, StyleSheet } from 'react-native';

// import ScreenName from '../../components/ScreenName.js'

// import NavBar from '../../navigation/navBar'

// export default class Category extends React.Component {

//   static navigationOptions = {

//   };

//   render() {
//     return (
//       <View>
//         <NavBar/>
//         <ScreenName name={'Add'} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';

// pull in the ScreenName component from ScreenName.js
// import ScreenName from '../../components/ScreenName.js'
import { SearchBar } from 'react-native-elements';

import { Card, ListItem, Button, Icon, Overlay } from 'react-native-elements'

import NavBar from '../../navBar'
// import FilterOverlay from '../../navigation/filterOverlay'
import database from '@react-native-firebase/database';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts,
   toggleFilter, updateCategory, updateScreenVar } from '../../../state/actions';

// import MenuPopUp from '../../components/MenuPopUp';

// import { FloatingAction } from "react-native-floating-action";
SampleFunction=()=>{

  // Write your own code here, Which you want to execute on Floating Button Click Event.
  Alert.alert("Floating Button Clicked");

}

// // FAB Implementation
// const addIcon = <Icon
//         name='add'
//         type='material'
//         color='#517fa4'/>
// const actions = [
//   {
//     text: "Add Product",
//     icon: {addIcon},
//     name: "bt_accessibility",
//     position: 2
//   }
// ];

// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from 'react-native-popup-menu';

class Category extends React.Component {
  constructor(props) {
    super(props);
  }

  onFocusFunction = () => {
    // do some stuff on every screen focus
    this.props.updateScreenVar({screen:'category'});
    console.log("category focused");
  }

  // and don't forget to remove the listener
  componentWillUnmount () {
    this.focusListener.remove()
  }

  filterCatByUid(eJSON){
    var rowsCat = [];// = [{"description": "NONE", "name": "NONE"}];
    for(var i in eJSON){
      // console.log(this.props.products.userObj.uid + " " + eJSON[i].sellerId);
      // console.log('bih + ' + eJSON[i])
      if (this.props.products.userObj.uid === eJSON[i].userId) {
        //console.log('bih + ' + eJSON[i])
        tempJSON = eJSON[i]
        // tempJSON["id"] = i;
        rowsCat.push(tempJSON);
      }
    }
    return rowsCat;
  }

  componentDidMount() {
    // this.props.updateScreenVar({screen:'category'});

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })

    // connect to a Firebase table
     var dbref = this.props.products.dbh.ref('products');
    // save database reference for later
    //  this.props.products.setState ( {dbulref: dbref});
    // meat: this is where it all happens
    //  dbref.on('value', (e) => {
        // var rows = [];
        // eJSON = e.toJSON()
        // for(var i in eJSON){
        //   rows.push(eJSON[i]);
        // }
        // var ds = rows;

        this.props.products.dbh.ref('categories').on('value', (e) => {
          var rowsCat = [];
          eJSON = e.toJSON()
          for(var i in eJSON){
            tempJSON = eJSON[i]
            tempJSON["id"] = i;
            rowsCat.push(tempJSON);
          }
  
          // var dsCat = rowsCat;
          var dsCat = this.filterCatByUid(rowsCat);
          // console.log('>>>>>>>>>>>')
          // // console.log(ds)
          // console.log(dsCat)
          // console.log('>>>>>>>>>>>')
          this.props.updateCategory(
            {
                dataCategorySearch: dsCat,
                dataCategoryDup: dsCat,
                // dataSourceDup: ds,
                //  loading: false,
              }
            );
            // console.log(this.props.products.dataSourceSearch);
       });
    //  });

  }

  componentDidUnMount() {
    this.props.products.dbulref.off('value');
  } 

  static navigationOptions = {
    // title: 'Shop',  
  };

  getTruncText(textObj){

    if (textObj === undefined) {
      return "";
    }

    var match = /\r|\n/.exec(textObj);
    var textLimit = 40;

    if (match) {
        // Found one, look at `match` for details, in particular `match.index`
      console.log('has newline');  
      console.log(textObj.match(/([^\n]+)/g))
      textObj = textObj.match(/([^\n]+)/g)[0]
    }
    if (textObj.length > textLimit){
      textObj = textObj.slice(0, textLimit)+"...";
    } 
    return textObj;
  }

  render() {

    const { search } = this.props.products.search;
    const mySearchIcon = <Icon
      name='search'
      type='material'
      color='#517fa4'
      size={26}
    />
    const myCancelIcon = <Icon
      name='search'
      type='material'
      color='#517fa4'
      size={26}
    />

    const customIcon = <Icon
        name='create'
        type='material'
        color='#517fa4'/>

      // const myMenu = <Menu>
      //   <MenuTrigger children={customIcon} />
      //   <MenuOptions>
      //     <MenuOption onSelect={(optionValue) => Alert.alert(
      //             'Alert!',
      //             'Are you sure you want to delete this category?',// + optionValue,
      //             [
      //               {text: 'Cancel', style: 'cancel'},
      //               {text: 'Yes', onPress: () => console.log('OK Pressed')},
      //             ],
      //             { cancelable: false }
      //           )} >
      //       <Text style={{color: 'red'}}>Delete</Text>
      //     </MenuOption>
      //   </MenuOptions>
      // </Menu>

    return (
      <View>
        <NavBar/>

        { <ScrollView>
        <View style={{flex: 1}}>
          {
            // list.map((l, i) => (
            this.props.products.dataCategorySearch.map((l, i) => (
              <ListItem
                // containerStyle={{height:100,width:1080}}
                key={i}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.name}
                subtitle={this.getTruncText(l.description)}
                bottomDivider
                // chevron={<MenuPopUp item={l} attachCategory={1}/>}
                onPress={() => {
                  this.props.navigation.navigate('detailCategory', {
                    category: l,
                  });
                }}
              />
            ))
          }
          
        </View>
        
        </ScrollView> }
    


      </View>
      

      // implemented without image without header, using ListItem component
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
},
addButton: {
  position: 'relative',
  zIndex: 11,
  left: 0,
  top: 0,
  backgroundColor: '#1A237E',
  width: 70,
  height: 70,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 8
},
addButtonText: {
  color: '#fff',
  fontSize: 60
},
scrollViewContainer: {
  flex: 1,
  marginBottom: 70,
},
  fab: { 
    position: 'absolute', 
    width: 56, 
    height: 56, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#03A9F4', 
    borderRadius: 30, 
    elevation: 8 
    }, 
    fabIcon: { 
      fontSize: 40, 
      color: 'white' 
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
    updateCategory,
    updateScreenVar,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Category);