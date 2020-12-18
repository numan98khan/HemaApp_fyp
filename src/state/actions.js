import {INITIATE_PRODUCTS, UPDATE_PRODUCTS, 
  TOGGLE_FILTER_OVERLAY, TOGGLE_IMAGE_OVERLAY, 
  UPDATE_CATEGORY, UPDATE_SCREEN_VAR,
  TOGGLE_SEARCH_BAR, UPDATE_USEROBJ,
  TOGGLE_MODE, INITIATE_SPECIALS, 
  CART_FUNCTION, UPDATE_LIVE_PRODUCTS} from './TYPES'

export const updateLiveProducts = productsSettings => (
  {
    type: UPDATE_LIVE_PRODUCTS,
    payload: productsSettings,
  }
);

export const cartFunction = productsSettings => (
  {
    type: CART_FUNCTION,
    payload: productsSettings,
  }
);

// Responsible for first get from db
export const initiateProducts = productsSettings => (
   {
     type: INITIATE_PRODUCTS,
     payload: productsSettings,
   }
 );

 export const initiatespecials = productsSettings => (
  {
    type: INITIATE_SPECIALS,
    payload: productsSettings,
  }
);

 export const updateProducts = productsSettings => (
   {
     type: UPDATE_PRODUCTS,
     payload: productsSettings,
   }
 );

 export const toggleMode = productsSettings => (
  {
    type: TOGGLE_MODE,
    payload: productsSettings,
  });

 export const toggleFilter = productsSettings => (
  {
    type: TOGGLE_FILTER_OVERLAY,
    payload: productsSettings,
  });

  export const toggleSearch = productsSettings => (
    {
      type: TOGGLE_SEARCH_BAR,
      payload: productsSettings,
    });

 export const toggleImageFilter = productsSettings => (
    {
      type: TOGGLE_IMAGE_OVERLAY,
      payload: productsSettings,
    }
);

export const updateCategory = productsSettings => (
  {
    type: UPDATE_CATEGORY,
    payload: productsSettings,
  }
);

export const updateScreenVar = productsSettings => (
  {
    type: UPDATE_SCREEN_VAR,
    payload: productsSettings,
  }
);

export const updateUserobj = productsSettings => (
  {
    type: UPDATE_USEROBJ,
    payload: productsSettings,
  }
);
