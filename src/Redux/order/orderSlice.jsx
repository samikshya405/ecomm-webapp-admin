import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name:'order',
    initialState:{
        allOrder:[]
    },
    reducers:{
        setAllOrder:(state,action)=>{
            state.allOrder=action.payload
        }
    }

})
export const {setAllOrder} = orderSlice.actions
export default orderSlice.reducer