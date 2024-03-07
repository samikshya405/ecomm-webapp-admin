import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { setImageInfo } from "./imageslider";

export const getSliderImage = ()=>async(dispatch)=>{
    const imageRef = collection(db, "imageSlider");
    try {
        const querySnapshot = await getDocs(imageRef);
        const imageList = [];
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          
          imageList.push({ id, ...doc.data() });
        });
        // console.log(imageList)
        dispatch(setImageInfo(imageList));
      } catch (e) {
        console.error("Error getting documents: ", e);
      }
    };

