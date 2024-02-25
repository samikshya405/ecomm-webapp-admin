import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { setUserInfo } from "./authSlice";

export const getUserInfoAction = (uid) => async (dispatch) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        dispatch(setUserInfo(docSnap.data()))
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
  } catch (error) {
    console.log(error)

  }
};
