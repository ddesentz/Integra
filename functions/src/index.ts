export const functions = require("firebase-functions");
export const algoliasearch = require("algoliasearch");
export const { onCall } = require("firebase-functions/v2/https");

const config = functions.config();

export const client = algoliasearch(
  config.algolia.app.id,
  config.algolia.write.key
);

module.exports = {
  ...require("./Firestore/firestoreFunctions"),
};
