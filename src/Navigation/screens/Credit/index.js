const list = [
  {
    country: 'Pakistan',
    sessions: 83,
  },
  {
    country: 'US',
    sessions: 11,
  },
  {
    country: 'Australia',
    sessions: 69,
  },
]

import React from 'react'
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native'

// import {Snackbar, TextInput, Card, Avatar, Button, Dialog, Portal, Title,List, Checkbox , Paragraph  } from 'react-native-paper';

import { Header, Icon, ButtonGroup, Divider, Rating, AirbnbRating, ListItem } from 'react-native-elements';
import ProductStyles from '../../common/productStyle';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts,
  toggleFilter, updateCategory, updateScreenVar } from '../../../state/actions';

import NavBar from '../../navBar'

class Credit extends React.Component {
  state = { 
    currentUser: null,
    totalSession: 163,
    credit: 0, 
  }

  onFocusFunction = () => {
    // do some stuff on every screen focus
    this.props.updateScreenVar({screen:'credit'});
    console.log("credit focused");
  }

  // and don't forget to remove the listener
  componentWillUnmount () {
    this.focusListener.remove()
  }

  componentDidMount() {
    // this.props.updateScreenVar({screen:'reviews'});

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })

    this.props.products.dbh
      .ref('/users/'+this.props.products.userObj.uid)
      // .child('users')
      // .orderByChild('employerId')
      // .equalTo(this.props.products.userObj.uid)
      .on("value", function(snapshot) {
        // console.log(snapshot.val().credit);

        // var fetchedCats = [];

        // snapshot.forEach(function(data) {
        //     console.log(data.toJSON());
        //     var tempJSON = data.toJSON();
        //     tempJSON['id'] = data.key;
        //     console.log(tempJSON);
            
        //     fetchedCats.push(tempJSON)
        // });

        this.setState({credit: snapshot.val().credit})

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
    //  var dbref = this.props.products.dbh.ref('products');
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

  getPercentage(count){
    // total = 163
    return Math.round(((count/this.state.totalSession)*100) * 10) / 10
  }

render() {
    const { currentUser } = this.state
return (
    <View>
      <NavBar/>
      <ScrollView>
      {/*
      <Card style={styles.firstCardContainer}>
        <Card.Title title="Your Wallet" titleStyle={styles.purpDreams} subtitle="Total" />
        <Card.Content style={{paddingBottom:'1%'}}>
          <Text style={{fontSize:40, color:'#b380ff'}}>{this.state.credit} Rs.</Text>
        </Card.Content>
      </Card>

      <Card style={styles.cardContainer}>
        <Card.Title title="Bumper" titleStyle={styles.purpDreams}/>
        <Card.Content>
        
        </Card.Content>
      </Card>
      */}

      </ScrollView>
      

    </View>
    )
  }
}
const styles = StyleSheet.create({
  cardContainer: {
    margin:'5%',
    marginVertical:'2.5%'
  },
  firstCardContainer: {
    margin:'5%',
    marginVertical:'2.5%',
    marginTop:'5%'
  },
  
  purpDreams: {
    color:"#6600ff"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(Credit);