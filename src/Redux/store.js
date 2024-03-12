import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Auth/authSlice'
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';
import categoriesReducer from './Categories/categoriesSlice'
import productReducer from './product/productSlice'
import imageSliderReducers from './imageslider/imageslider'
import customerReducers from './customers/customerSlice'
import orderReducer from './order/orderSlice'
import reviewReducer from './review/reviewSlice'


const persistConfig = {
    key: 'root',
    storage,
    
  };
  const persistAuthReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
    reducer:{
        auth:persistAuthReducer,
        categories:categoriesReducer,
        product:productReducer,
        imageSlider:imageSliderReducers,
        customer:customerReducers,
        order:orderReducer,
        review:reviewReducer
    }
   
})
