import { createSlice } from "@reduxjs/toolkit";

export const reviewSlice = createSlice({
    name:'review',
    initialState:{
        allReview:[]
    },
    reducers:{
        setAllReview:(state,action)=>{
            state.allReview=action.payload
        }
    }
})
export const {setAllReview} = reviewSlice.actions
export default reviewSlice.reducer