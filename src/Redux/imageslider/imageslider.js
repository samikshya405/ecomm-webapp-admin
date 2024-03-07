import { createSlice } from "@reduxjs/toolkit";

export const imageSlider = createSlice({
    name:'carousel',
    initialState:{
        images:[]
    },
    reducers:{
        setImageInfo:(state, action)=>{
            state.images = action.payload
        }
    }

})
export const {setImageInfo} = imageSlider.actions
export default imageSlider.reducer