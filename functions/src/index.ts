export const functions = require("firebase-functions");
export const algoliasearch = require("algoliasearch");
export const { onCall } = require("firebase-functions/v2/https");

const config = functions.config();
console.log(config);

console.log(config.algolia.app.id, config.algolia.write.key);
export const client = algoliasearch(
  config.algolia.app.id,
  config.algolia.write.key
);

module.exports = {
  ...require("./Firestore/firestoreFunctions"),
};
