import { collection, getDocs, query, where } from "firebase/firestore";
import { setCustomers } from "./customerSlice";
import { db } from "../../Firebase";

export const getAllCustomers = () => async (dispatch) => {
    try {
        const q = query(collection(db, "users"), where("role", "==", 'customer'));
  
        const querySnapshot = await getDocs(q);
        const allCustomers =[]
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const id=doc.id
          allCustomers.push({id,...doc.data()})
          // console.log(doc.id, " => ", doc.data());
        });
        dispatch(setCustomers(allCustomers))
      } catch (error) {
        console.log(error);
      }
};
