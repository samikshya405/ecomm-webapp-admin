import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoriesList: [],
    selectedSubCategoriesList: [],
  },
  reducers: {
    setCategoriesList: (state, action) => {
      state.categoriesList = action.payload;
    },
    setSelecetedSubCategories: (state, action) => {
      state.selectedSubCategoriesList= action.payload
    },
  },
});

export const { setCategoriesList, setSelecetedSubCategories } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
