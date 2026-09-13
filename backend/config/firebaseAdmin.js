const admin = require("firebase-admin");

let firebaseAdmin;

function getFirebaseAdmin() {
  if (firebaseAdmin) return firebaseAdmin;

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJson) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not configured");
  }

  const serviceAccount = JSON.parse(serviceAccountJson);
  firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  return firebaseAdmin;
}

module.exports = getFirebaseAdmin;
