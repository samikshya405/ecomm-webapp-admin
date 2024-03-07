import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
    name:'customers',
    initialState:
        {
            customers:[]
        }
    ,
    reducers:{
        setCustomers:(state,action)=>{
            state.customers=action.payload
        }
    }

})

export const {setCustomers} = customerSlice.actions

export default customerSlice.reducer