import { doc, setDoc } from "firebase/firestore";
import { db } from "../../..";
import { Live_POV_Objects_Data } from "./HelperData";

export const uploadObjects = () => {
  Live_POV_Objects_Data.forEach((object) => {
    setDoc(doc(db, `Live_POV_Objects`, object.identity.callsign), object);
  });
};
