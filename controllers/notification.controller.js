import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
import serviceAccount from '../config/firebase-service-account.json' assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
