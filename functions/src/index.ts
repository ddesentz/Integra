export const functions = require("firebase-functions");
export const { onCall } = require("firebase-functions/v2/https");

module.exports = {
  ...require("./Firestore/firestoreFunctions"),
};
