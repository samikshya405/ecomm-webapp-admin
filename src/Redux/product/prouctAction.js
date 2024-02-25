import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { setProductList, setSelectedProduct } from "./productSlice";
import { db } from "../../Firebase";

export const getProductAction = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productList = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const uid = doc.id;
      productList.push({ uid, ...doc.data() });
    });
    dispatch(setProductList(productList));
  } catch (error) {
    console.log(error);
  }
};
export const getProductById = (id) => async(dispatch) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const product = {
        ...docSnap.data(),
        id,
      };
      
      dispatch(setSelectedProduct(product))
    } else {
      toast.error("Product not found!");
      // navig
    }
  } catch (error) {}
};

export const deleteProductById = async(productId)=>{
  try{
    await deleteDoc(doc(db, "products", productId));
    

  }catch(error){
    console.log(error)

  }

}