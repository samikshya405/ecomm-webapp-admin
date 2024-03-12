import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { setAllOrder } from "./orderSlice";
import { db } from "../../Firebase";
import { toast } from "react-toastify";

export const getAllOrderHistory = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const orderList = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const uid = doc.id;
      orderList.push({ uid, ...doc.data() });
    });
    dispatch(setAllOrder(orderList));
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus=(id, restInfo)=>async(dispatch)=>{
    try{
      const orderRef =doc(db, 'orders', id)
      await setDoc(orderRef, restInfo, {merge:true})
      dispatch(getAllOrderHistory())
      toast.success('status updated')
  
    }catch(error){
      console.log(error)
    }
  
  }