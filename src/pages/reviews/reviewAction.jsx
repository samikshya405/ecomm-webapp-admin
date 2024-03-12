import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { setAllReview } from "../../Redux/review/reviewSlice";

export const getAllReview = ()=>async(dispatch)=>{
    try{
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const reviewList = [];
        querySnapshot.forEach((doc) => {
          const id = doc.id;
   
          reviewList.push({ id, ...doc.data() });
        });
        dispatch(setAllReview(reviewList))
    }catch(error){
        console.log(error)

    }

}