import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import {
  setCategoriesList,
  setSelecetedSubCategories,
} from "./categoriesSlice";

export const categoryAction = () => async (dispatch) => {
  const collectionRef = collection(db, "categories");
  try {
    const querySnapshot = await getDocs(collectionRef);
    const categoriesList = [];
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      categoriesList.push({ id, ...doc.data() });
    });
    dispatch(setCategoriesList(categoriesList));
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};

export const getCategorySubcollection = (categoryId) => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "categories", categoryId, "subCategories")
    );
    const subcollectionData = [];
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const eachCollection = { id, ...doc.data() };
      subcollectionData.push(eachCollection);
    });

    dispatch(
      setSelecetedSubCategories(subcollectionData)
    );
  } catch (error) {
    console.error("Error getting category subcollection:", error);
  }
};
