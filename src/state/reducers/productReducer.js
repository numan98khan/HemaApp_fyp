import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import * as types from '../TYPES'
import { act } from 'react-test-renderer';

const ds = [];
const INITIAL_STATE = {
    loading: true, 
    dbh: database(),
    bucket: storage().ref().bucket,
    dataSourceSearch: ds,
    dataSourceFilter: ds,
    dataSourceDup: ds,
    dataCategoryDup: ds,
    dataCategorySearch: ds,
    search: '',
    isFilterOn: false,
    category: 'NONE',
    isFilterVisible: false,
    currentScreen:'',
    isSearchBar:false,
    userObj:null,
    // appMode: 'buyer',
    appMode: 'seller',
    specials: ds,
    currentCart:[],
    liveProductList:[]
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.UPDATE_LIVE_PRODUCTS:
        // console.log('user reducer > '+ action.payload.userObj.uid);
        return Object.assign({}, state, {
            liveProductList: action.payload.liveProductList,
        });
    case types.TOGGLE_MODE:
        console.log('TOGGLE_MODE reducer > ' + state.appMode);
        var modeSend;
        if (state.appMode === 'seller') {
            modeSend = 'buyer'
        } else {
            modeSend = 'seller'
        }
        return Object.assign({}, state, {
            appMode: modeSend,
        });
    case types.UPDATE_USEROBJ:
        console.log('user reducer > '+ action.payload.userObj.uid);
        return Object.assign({}, state, {
            userObj: action.payload.userObj,
        });
    case types.INITIATE_SPECIALS:

        return Object.assign({}, state, {
            specials: action.payload.specials,
        });
    case types.INITIATE_PRODUCTS:

        return Object.assign({}, state, {
            loading: action.payload.loading,
            dataSourceSearch: action.payload.dataSourceSearch,
            dataSourceFilter: action.payload.dataSourceFilter,
            dataSourceDup: action.payload.dataSourceDup,
        });
    case types.UPDATE_PRODUCTS:
        // getMethods = (obj) => Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function')
        // console.log(getMethods(action.payload));
        var updateSend;

        if (action.payload.dataSourceSearch !== undefined) {
            updateSend = Object.assign({}, state, {
                dataSourceSearch: action.payload.dataSourceSearch,
            });
        } else if (action.payload.category !== undefined) {
            updateSend = Object.assign({}, state, {
                category: action.payload.category,
            });
            // console.log('category updated');
        }
        return updateSend
    case types.TOGGLE_FILTER_OVERLAY:
        var boolSet;
        if (state.isFilterOn){
            boolSet = false;
        } else {
            boolSet = true;
        }
        console.log("changeed")
        return Object.assign({}, state, {
            isFilterOn: boolSet,
        });
    case types.TOGGLE_IMAGE_OVERLAY:
            var boolSet;
            if (state.isFilterVisible){
                boolSet = false;
            } else {
                boolSet = true;
            }
            console.log("changeed")
            return Object.assign({}, state, {
                isFilterVisible: boolSet,
            });
    case types.CART_FUNCTION:
        var updateSend;
        var newCart = state.currentCart

        if (action.payload.add !== undefined) {
            // updateSend = Object.assign({}, state, {
            //     dataCategoryDup: action.payload.dataCategoryDup,
            //     dataCategorySearch: action.payload.dataCategorySearch,
            // });
            newCart.push(action.payload.product)
            console.log('item added to cart');
            // console.log(action.payload.dataCategoryDup)
        } else if (action.payload.remove !== undefined){ //if (action.payload.dataCategorySearch !== undefined) {
            // updateSend = Object.assign({}, state, {
            //     dataCategorySearch: action.payload.dataCategorySearch,
            
            // });
            console.log('category list updated');
        } else if (action.payload.flush !== undefined) {
            // updateSend = Object.assign({}, state, {
            //     dataCategoryDup: action.payload.dataCategoryDup,
            //     dataCategorySearch: action.payload.dataCategorySearch,
            // });
            // newCart.push(action.payload.product)
            newCart = [];
            console.log('cart emptied');
            // console.log(action.payload.dataCategoryDup)
        } 

        return Object.assign({}, state, {
            currentCart: newCart,
        });
    case types.UPDATE_CATEGORY:
        var updateSend;

        if (action.payload.dataCategoryDup !== undefined) {
            updateSend = Object.assign({}, state, {
                dataCategoryDup: action.payload.dataCategoryDup,
                dataCategorySearch: action.payload.dataCategorySearch,
            });
            console.log('category list initiated');
            // console.log(action.payload.dataCategoryDup)
        } else if (action.payload.dataCategorySearch !== undefined) {
            updateSend = Object.assign({}, state, {
                dataCategorySearch: action.payload.dataCategorySearch,
            
            });
            console.log('category list updated');
        }
        return updateSend
    case types.TOGGLE_SEARCH_BAR:
        var boolSet;
        if (state.isSearchBar){
            boolSet = false;
        } else {
            boolSet = true;
        }
        console.log("changeed")
        return Object.assign({}, state, {
            isSearchBar: boolSet,
        });
    case types.UPDATE_SCREEN_VAR:
        return Object.assign({}, state, {
            currentScreen: action.payload.screen,
        });
    default:
      return state
  }
};

export default productReducer