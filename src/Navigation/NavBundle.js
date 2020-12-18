// import {createStackNavigator} from 'react-navigation-stack';
import {createNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import { createStackNavigator } from 'react-navigation-stack';

// import React, { Component } from "react";

// import { Header, Icon, ButtonGroup } from 'react-native-elements';

import SignUp from './screens/SignUp'
import Login from './screens/Login'
// import Main from '../screens/Products'
// import LiveStream from '../screens/LiveStream'
import Loading from './screens/Loading';
import Credit from './screens/Credit';
import Statistics from './screens/Statistics';

import drawerContentComponents from './drawerContentComponents'

import CameraView from '../CameraScreen/index';
// import GraphView

import { categoryStack, productStack } from './NavStacks';


const sellerDrawer = createDrawerNavigator({
    // Products: productStack,
    // Category: categoryStack,
    // Reviews: reviewStack,
    // GraphView: 
    CameraView: CameraView,
    // Statistics: {
    //     screen: Statistics,
    // },
    // Credit: {
    //     screen: Credit,
    // },
},{
    drawerWidth:250,
    drawerType:'slide',
    // initialRouteName:'Credit',
    initialRouteName:'CameraView',
    // initialRouteName:'Reviews',
    // initialRouteName:'Hire',
    // initialRouteName:'Statistics',
    // initialRouteName:'Live',
    // contentComponent: drawerContentComponents,
    
    // The drawer menu will be added throough here (thorugh component just like NavBar)
    // https://medium.com/@arunkmoury/customize-drawer-of-react-navigation-like-champ-9b42df489d42
    // contentComponent : DrawerMenu

});

const Seller = createSwitchNavigator(
    {
        loading: Loading,
        signup: SignUp,
        login: Login,
        home: sellerDrawer,
        // editor: EditProduct,
    },
    {
        initialRouteName:'loading'
    },
    {
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#000',
            },
        },
    }
);

// var Home;
// if ( this.props.products.appMode === 'Seller' ) {
//     Home = Seller;
// } else {
//     Home = Buyer;
// }




// export default connect(mapStateToProps, mapDispatchToProps)(createAppContainer(Home));


// export const BuyerNav = createAppContainer(Buyer);
const container = createAppContainer(Seller);
export default container;


