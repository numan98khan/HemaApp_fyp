import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

import { Header, Icon, ButtonGroup } from 'react-native-elements';
import { withNavigation} from 'react-navigation';

import { Searchbar } from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts, toggleFilter, toggleSearch } from '../state/actions';

import styles from "./style";

class NavBar extends React.Component {

    // state = {
    //   isFilterVisible: false,
    // };
    constructor () {
      super()
      this.state = {
        selectedIndex: 2
      }
      this.updateIndex = this.updateIndex.bind(this)
    }
    updateIndex (selectedIndex) {
      this.setState({selectedIndex})
    }
    render(){
      const { selectedIndex } = this.state

        var MenuIcon = <Icon
                name='menu'
                color='#fff'
                onPress={() => this.props.navigation.toggleDrawer()}
                iconStyle={styles.iconStyle} />

        // const FilterIcon = <Icon
        //         name='tune'
        //         color='#fff'
        //         onPress={() => console.log('filters enabled')} />

        let MySearchComp = <Searchbar
                  placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    // value={search}
                    // platform="android"
                    // showLoading={true}
                    containerStyle={StyleSheet.create({
                      container: {
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position:'absolute',
                        
                      },
                    })}
              />

        let searchIconName;
        if (this.props.products.isSearchBar){
          searchIconName = 'close';
        } else {
          searchIconName = 'search';
        }
        let searchIcon = <Icon
            name={searchIconName}
            color='#fff'
            onPress={() => this.props.toggleSearch()} 
            iconStyle={styles.iconStyle} />;

        let rightComp;
        var middleComponentText = "MiddleComponent";

        console.log("NAVBAR ::: " + this.props.products.currentScreen);

        if (this.props.products.currentScreen === 'products'){
          console.log('debug1');
          // middleComponentText = 'Products';
          middleComponentText = 'Friends';
          rightComp = <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/*searchIcon*/}
            <Icon
                  name='notifications'
                  color='#fff'
                  onPress={() => this.props.navigation.navigate('addProductNotif')}
            iconStyle={styles.iconStyle}  />  
          <Icon
                  name='add'
                  color='#fff'
                  // onPress={() => console.log('add enabled')} 
                  onPress={() => this.props.navigation.navigate('addProduct')} 
                  iconStyle={styles.iconStyle} />
            {/*<Icon
                  name='tune'
                  color='#fff'
                  onPress={() => this.props.toggleFilter()}
            iconStyle={styles.iconStyle}  />*/}
          </View>
        } else if (this.props.products.currentScreen === 'category') {
          // console.log('debug');
          middleComponentText = 'Category';
          rightComp = <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/*searchIcon*/}
            <Icon
                  name='add'
                  color='#fff'
                  // onPress={() => console.log('add enabled')} 
                  onPress={() => this.props.navigation.navigate('addCategory')} 
                  iconStyle={styles.iconStyle}
                  />
          </View>
        } else if (this.props.products.currentScreen === 'reviews') {
          // console.log('debug');
          middleComponentText = 'Reviews';
          rightComp = <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/*searchIcon*/}
            <Icon
                  name='add'
                  color='#fff'
                  // onPress={() => console.log('add enabled')} 
                  onPress={() => this.props.navigation.navigate('addReview')} 
                  iconStyle={styles.iconStyle}
                  />
          </View>
        } else if (this.props.products.currentScreen === 'hire') {
          // console.log('debug');
          middleComponentText = 'Hiring';
          rightComp = <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/*searchIcon*/}
            <Icon
                  name='notifications'
                  color='#fff'
                  // onPress={() => console.log('add enabled')} 
                  onPress={() => this.props.navigation.navigate('getHired')} 
                  iconStyle={styles.iconStyle}
            />
            <Icon
                  name='add'
                  color='#fff'
                  // onPress={() => console.log('add enabled')} 
                  onPress={() => this.props.navigation.navigate('addHire')} 
                  iconStyle={styles.iconStyle}
                  />
          </View>
        } else if (this.props.products.currentScreen === 'livelist') {
          // console.log('debug');
          middleComponentText = 'Live Streams';
          rightComp = <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/*searchIcon*/}
            {/*<Icon
                  name='cloud'
                  color='#fff'
                  // onPress={() => console.log('add enabled')} 
                  onPress={() => this.props.navigation.navigate('LiveStream')} 
                  iconStyle={styles.iconStyle}
            />*/}
            <Icon
                  name='add'
                  color='#fff'
                  // onPress={() => console.log('add enabled')} 
                  onPress={() => this.props.navigation.navigate('addLiveRequest')} 
                  iconStyle={styles.iconStyle}
                  />
          </View>
        } else if (this.props.products.currentScreen === 'liverequestlist') {
          // console.log('debug');
          middleComponentText = 'Live Requests';
          rightComp = <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/*searchIcon*/}
            <Icon
                  name='list'
                  color='#fff'
                  // onPress={() => console.log('add enabled')} 
                  onPress={() => this.props.navigation.navigate('LiveProductList')} 
                  iconStyle={styles.iconStyle}
                  />
          </View>
        } else if (this.props.products.currentScreen === 'cart') {
          // console.log('debug');
          middleComponentText = 'Cart';
        } else if (this.props.products.currentScreen === 'offers') {
          // console.log('debug');
          middleComponentText = 'Offers';
        } else if (this.props.products.currentScreen === 'productReviews') {
          // console.log('debug');
          middleComponentText = 'Reviews';
        } else if (this.props.products.currentScreen === 'statistics') {
          // console.log('debug');
          middleComponentText = 'Statistics';
        } else if (this.props.products.currentScreen === 'credit') {
          // console.log('debug');
          middleComponentText = 'Credit';
        } else if (this.props.products.currentScreen === 'buyerProducts') {
          // console.log('debug');
          middleComponentText = 'Products';
        } else if (this.props.products.currentScreen === 'LiveProductList') {
          // console.log('debug');
          MenuIcon = null;
          middleComponentText = 'Add Products';
          rightComp = <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/*searchIcon*/}
            <Icon
                  name='cloud'
                  color='#fff'
                  // onPress={() => console.log('add enabled')} 
                  onPress={() => this.props.navigation.navigate('LiveStreamSeller')} 
                  iconStyle={styles.iconStyle}
                  />
          </View>
        }    
        return(
      <View>
       {this.props.children}
       <Header leftComponent={MenuIcon}
              centerComponent={<Text style={{color:'#fff', fontSize:24}}>{middleComponentText}</Text>}
              rightComponent={rightComp}
              backgroundColor="#6600ff"
              >
        {/* <MyCustomLeftComponent />
        <MyCustomCenterComponent />
        <MyCustomRightComponent /> */}
        </Header>
      </View>
      )
    }
  }

  

const mapStateToProps = (state) => {
  const { products } = state
  return { products }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    toggleFilter,
    updateProducts,
    toggleSearch,
  }, dispatch)
);

// export default withNavigation(NavBar) 
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NavBar));