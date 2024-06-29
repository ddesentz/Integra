import { doc, setDoc } from "firebase/firestore";
import { db } from "../../..";

export const sortObject = (unordered, sortArrays = false) => {
  if (!unordered || typeof unordered !== "object") {
    return unordered;
  }

  if (Array.isArray(unordered)) {
    const newArr = unordered.map((item) => sortObject(item, sortArrays));
    if (sortArrays) {
      newArr.sort();
    }
    return newArr;
  }

  const ordered = {};
  Object.keys(unordered)
    .sort()
    .forEach((key) => {
      ordered[key] = sortObject(unordered[key], sortArrays);
    });
  return ordered;
};

export const uploadObjects = async (data: any[], datasetName: string) => {
  data.forEach(async (object) => {
    await setDoc(doc(db, `${datasetName}`, object.identity.callsign), object, {
      merge: true,
    });
    await setDoc(
      doc(
        db,
        `${datasetName}/${object.identity.callsign}/history`,
        new Date().toISOString()
      ),
      object
    );
  });
};

export const updateObjectHistory = (
  newData: any,
  datasetName: string,
  docId: string
) => {
  setDoc(doc(db, `${datasetName}`, docId), newData, {
    merge: true,
  });
  setDoc(
    doc(db, `${datasetName}/${docId}/history`, new Date().toISOString()),
    newData
  );
};
