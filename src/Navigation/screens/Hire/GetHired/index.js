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

import NavBar from '../../../navigation/navBar'
// import FilterOverlay from '../../navigation/filterOverlay'
import database from '@react-native-firebase/database';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts,
   toggleFilter, updateCategory, updateScreenVar } from '../../../state/actions';

// import MenuPopUp from '../../components/MenuPopUp';

import ProductStyles from '../../../common/productStyle';

import { FloatingAction } from "react-native-floating-action";
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

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
// import productStyle from '../../common/productStyle.js';

class GetHired extends React.Component {
  constructor(props) {
    super(props);
  }

  state={
    hires:[],
  }

  onFocusFunction = () => {
    // do some stuff on every screen focus
    this.props.updateScreenVar({screen:'gethire'});
    console.log("hire focused");
  }

  // and don't forget to remove the listener
  componentWillUnmount () {
    this.focusListener.remove()
  }

  componentDidMount() {
    // this.props.updateScreenVar({screen:'category'});

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })

    database()
      .ref('/')
      .child('hire')
      .orderByChild('employerId')
      .equalTo(this.props.products.userObj.uid)
      .on("value", function(snapshot) {
        // console.log(snapshot.val());

        var fetchedCats = [];

        snapshot.forEach(function(data) {
            // console.log(data.toJSON());
            var tempJSON = data.toJSON();
            tempJSON['id'] = data.key;
            // console.log(tempJSON);
            
            fetchedCats.push(tempJSON)
        });

        this.setState({hires: fetchedCats})

        // this.props.initiateProducts(
        //   {
        //       // dataSourceSearch: ds,
        //       dataSourceFilter: fetchedCats,
        //       // dataSourceDup: ds,
        //       loading: false,
        //     }
        //   );
    }.bind(this));

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

    //  });

  }

  componentDidUnMount() {
    this.props.products.dbulref.off('value');
  } 

  // deleteProduct(){}

  updateSearch = search => {
    // this.setState({ search });

    // Normal filter
    this.props.updateCategory(
      {
        dataCategorySearch: this.props.products.dataCategoryDup.filter(function (el) {
            return el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
          }),
        }
      );

    

    // this.props.products.dataSourceSearch = this.props.products.dataSourceDup.filter(function (el) {
    //   return el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    // });
  };

  static navigationOptions = {
    // title: 'Shop',  
  };


  getSubStyle(state){
    ProductStyles.smallREQText
    if (state === "REQUESTED") {
      return ProductStyles.smallREQText
    } else if (state === "REJECTED") { 
      return ProductStyles.smallREJText
    } else if (state === "ACCEPTED") {
      return ProductStyles.smallACCText
    } else if (state === "DISCARDED") {
      return ProductStyles.smallDISText
    }
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


    return (
      <View>
        { <ScrollView>
        <View style={{flex: 1}}>
          {
            this.state.hires.map((l, i) => (
            // this.props.products.dataCategorySearch.map((l, i) => (
              <ListItem
                // containerStyle={{height:100,width:1080}}
                key={i}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.employerEmail}
                subtitle={l.message}
                subtitleStyle={this.getSubStyle(l.state)}
                bottomDivider
                // chevron={<MenuPopUp item={l} attachHire={1}/>}
                onPress={() => {
                  this.props.navigation.navigate('getHiredDetails', {
                    hireObj: l,
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

export default connect(mapStateToProps, mapDispatchToProps)(GetHired);