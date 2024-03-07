import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:'product',
    initialState:{
        productList:[],
        selectedProduct:{}
    },
    reducers:{
        setProductList:(state, action)=>{
            state.productList= action.payload
        },
        setSelectedproduct:(state, action)=>{
            state.selectedProduct=action.payload
            
        }
    }
})
export const {setProductList, setSelectedProduct} = productSlice.actions
export default productSlice.reducer