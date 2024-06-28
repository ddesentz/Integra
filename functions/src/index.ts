export const functions = require("firebase-functions");
export const algoliasearch = require("algoliasearch");
export const { onCall } = require("firebase-functions/v2/https");

export const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_WRITE_KEY
);

module.exports = {
  ...require("./Firestore/firestoreFunctions"),
};
