import { doc, setDoc } from "firebase/firestore";
import { db } from "../../..";
import { features } from "process";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const flatten = (obj, roots = [], sep = ".") =>
  Object
    // find props of given object
    .keys(obj)
    // return an object by iterating props
    .reduce(
      (memo, prop) =>
        Object.assign(
          // create a new object
          {},
          // include previously returned object
          memo,
          Object.prototype.toString.call(obj[prop]) === "[object Object]"
            ? // keep working if value is an object
              flatten(obj[prop], roots.concat([prop]), sep)
            : // include current prop and value and prefix prop with the roots
              { [roots.concat([prop]).join(sep)]: obj[prop] }
        ),
      {}
    );

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

export const convertObjectsToFeatureCollection = (
  objects: any[],
  isHistory: boolean
) => {
  return {
    type: "FeatureCollection",
    isHistory: isHistory,
    features: objects.map((object) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            (object.estimatedKinematics.position.longitude * 180) / Math.PI,
            (object.estimatedKinematics.position.latitude * 180) / Math.PI,
          ],
        },
        properties: object,
      };
    }),
  };
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
    await delay(5);
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
