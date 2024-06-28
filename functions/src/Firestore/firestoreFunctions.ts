import { client, functions, onCall } from "..";
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const objectIndex = client.initIndex("Live_POV_Objects");

exports.getRootStore = onCall(() => {
  return new Promise((resolve, reject) => {
    db.listCollections()
      .then((snapshots: any) => {
        resolve(
          snapshots.map(
            (snapshot: any) => snapshot["_queryOptions"].collectionId
          )
        );
      })
      .catch((error: any) => reject(error));
  });
});

exports.getDocumentCollections = onCall((data: any) => {
  const parentPath = data.data.parentPath;
  const docId = data.data.docId;

  return new Promise((resolve, reject) => {
    db.collection(parentPath)
      .doc(docId)
      .listCollections()
      .then((snapshots: any) => {
        resolve(
          snapshots.map(
            (snapshot: any) => snapshot["_queryOptions"].collectionId
          )
        );
      })
      .catch((error: any) => reject(error));
  });
});

exports.addObjectIndex = functions.firestore
  .document("Live_POV_Objects/{objectId}")
  .onCreate((snapshot: any) => {
    const data = snapshot.data();
    const objectID = snapshot.id;
    return objectIndex.saveObject({ ...data, objectID });
  });

exports.updateObjectIndex = functions.firestore
  .document("Live_POV_Objects/{objectId}")
  .onUpdate((change: any) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return objectIndex.saveObject({ ...newData, objectID });
  });

exports.deleteObjectIndex = functions.firestore
  .document("Live_POV_Objects/{objectId}")
  .onDelete((snapshot: any) => objectIndex.deleteObject(snapshot.id));
