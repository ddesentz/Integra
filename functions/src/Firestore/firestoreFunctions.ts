import { onCall } from "..";
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

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
