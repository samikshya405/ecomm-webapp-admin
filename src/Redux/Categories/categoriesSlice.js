import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoriesList: [],
    selectedSubCategoriesList: [],
    subCategoryList:[]
  },
  reducers: {
    setCategoriesList: (state, action) => {
      state.categoriesList = action.payload;
    },
    setSelecetedSubCategories: (state, action) => {
      state.selectedSubCategoriesList= action.payload
    },
    setSubCategoryList:(state,action)=>{
      state.subCategoryList=action.payload
    }
  },
});

export const { setCategoriesList, setSelecetedSubCategories, setSubCategoryList } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
