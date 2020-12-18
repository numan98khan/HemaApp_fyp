// import {createStackNavigator} from 'react-navigation-stack';
import {createNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import React, { Component } from "react";

import { Header, Icon, ButtonGroup } from 'react-native-elements';

import ScreenOne from './screens/Products';

import Category from './screens/Category';
import AddProduct from './screens/Products/AddProduct';

import EditProduct from './screens/Products/EditProduct';

import ProductDetails from './screens/Products/ProductDetails';

import AddCategory from './screens/Category/AddCategory';

import CategoryDetails from './screens/Category/CategoryDetails';

export const categoryStack = createStackNavigator(
    {
        Category: {
            screen: Category,
            navigationOptions: {
                headerShown: false,
            },
            
        },
        addCategory: {
            screen:AddCategory,
            navigationOptions: {
                title:"Add Category",
                // headerShown: false,
            },
        },
        detailCategory: {
            screen:CategoryDetails,
            navigationOptions: {
                title:"Category Details",
                // headerShown: false,
            },
        }
    },
    {
        defaultNavigationOptions: {
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                const title =
                  options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.routeName;
                // console.log(title)
              
                return (<Header backgroundColor="#6600ff"
                centerComponent={{ text: title, style: { color: '#fff', fontSize:24 } }}
                // leftContainerStyle={{width: 400}}
                // leftComponent={previous ? <Icon
                //         name="clear"
                //         color='#fff'
                //         onPress={navigation.goBack}
                //         iconStyle={styles.iconStyle} /> : undefined}
                >
              {/* <MyCustomLeftComponent />
              <MyCustomCenterComponent />
              <MyCustomRightComponent /> */}
              </Header>);
              }
        }
    }
);

export const productStack = createStackNavigator(
    {
        Products: {
            screen: ScreenOne,
            navigationOptions: {
                headerShown: false,
            },
            
        },
        detailProduct: {
            screen:ProductDetails,
            navigationOptions: {
                title:"Details",
            },
            
        },
        editProduct: {
            screen:EditProduct,
            navigationOptions: {
                title:"Edit Product",
            },
        },
        addProduct: {
            screen:AddProduct,
            navigationOptions: {
                title:"Add Product",
                // headerShown: false,
            },
        },

        // addProductNotif: {
        //     screen: GetOffers,
        //     navigationOptions: {
        //         title:"Available Offers",
        //         // headerShown: false,
        //     },
        // },

        // addProductNotifDetails: {
        //     screen: GetOfferDetails,
        //     navigationOptions: {
        //         title:"Offer Details",
        //         // headerShown: false,
        //     },
        // }
    },
    {
        defaultNavigationOptions: {
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                const title =
                  options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.routeName;
                // console.log(title)
              
                return (<Header backgroundColor="#6600ff"
                centerComponent={{ text: title, style: { color: '#fff', fontSize:24 } }}
                // leftContainerStyle={{width: 400}}
                // leftComponent={previous ? <Icon
                //         name="clear"
                //         color='#fff'
                //         onPress={navigation.goBack}
                //         iconStyle={styles.iconStyle} /> : undefined}
                >
              {/* <MyCustomLeftComponent />
              <MyCustomCenterComponent />
              <MyCustomRightComponent /> */}
              </Header>);
              }
        }
    }
);