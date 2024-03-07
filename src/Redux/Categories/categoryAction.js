import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import {
  setCategoriesList,
  setSelecetedSubCategories,
  setSubCategoryList,
} from "./categoriesSlice";
import { toast } from "react-toastify";

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
      const parentCatId = categoryId
      const id = doc.id;
      const eachCollection = { id,parentCatId, ...doc.data() };
      subcollectionData.push(eachCollection);
    });

    dispatch(setSelecetedSubCategories(subcollectionData));
  } catch (error) {
    console.error("Error getting category subcollection:", error);
  }
};

export const addCategory = (docdata) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "categories"), docdata);
    dispatch(categoryAction());
    toast.success("categories added");
  } catch (error) {
    console.log(error);
  }
};
export const addSubCategory = (id, docData) => async (dispatch) => {
  const parentDocRef = doc(db, "categories", id);
  const subcollectionRef = collection(parentDocRef, "subCategories");

  try {
    const newSubDocRef = await addDoc(subcollectionRef, docData);

    toast.success("subcategories added");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
export const getAllSubCategory = (categoriesList) => async (dispatch) => {
  try {
    const subCategoryList = [];

    for (const category of categoriesList) {
      const querySnapshot = await getDocs(
        collection(db, "categories", category.id, "subCategories")
      );

      const subcollectionData = [];
      querySnapshot.forEach((doc) => {
        const parentCatId = category.id
        const id = doc.id;
        const eachCollection = { id, parentCatId, ...doc.data() };
        subcollectionData.push(eachCollection);
      });

      subCategoryList.push(...subcollectionData);
    }
    dispatch(setSubCategoryList(subCategoryList));
  } catch (error) {}
};
export const updateCategory=(id, restInfo)=>async(dispatch)=>{
  try{
    const categoryRef =doc(db, 'categories', id)
    await setDoc(categoryRef, restInfo, {merge:true})
    dispatch(categoryAction())
    toast.success('category updated')

  }catch(error){
    console.log(error)
  }

}

export const updateSubCategory =(parentCatId, catId, updatedData)=>async(dispatch)=>{
 try{
  const subCatRef = doc(db,'categories',parentCatId, 'subCategories', catId)
  await updateDoc(subCatRef, updatedData,{merge:true})
  toast.success('category updated')
 

 }catch(error){
  console.log(error)
 }

}
export const deleteCategory=(id)=>async(dispatch)=>{
  try {
    await deleteDoc(doc(db, "categories", id));
    dispatch(categoryAction())
    toast.success("Deleted successfully");
    
  } catch (error) {
    console.log(error);
  }

}
export const deleteSubCategory=(parentCatId, subCatId)=>async(dispatch)=>{
  try {
    // Construct the document reference for the subcategory
    const subCatRef = doc(db, 'categories', parentCatId, 'subCategories', subCatId);

    // Delete the subcategory document
    await deleteDoc(subCatRef);
    dispatch(getCategorySubcollection(parentCatId))
    
    toast.success('Subcategory deleted successfully!');
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    toast.error('Failed to delete subcategory. Please try again later.');
  }

}
