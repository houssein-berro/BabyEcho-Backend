import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
import serviceAccount from '../config/firebase-service-account.json' assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Send Notification Controller Function with Static Message
export const sendNotification = (req, res) => {
    const fcmToken = req.body.fcmToken; // Make sure the FCM token is passed from the request
    console.log('====================================');
    console.log(fcmToken);
    console.log('====================================');
    if (!fcmToken) {
      return res.status(400).send('FCM token is required');
    }
  
    const payload = {
        token: fcmToken,
        notification: {   
            title: 'BabyEcho',
            body: 'Your baby needs you! ASAP!!!',
        },
    };
  
    // Send notification using Firebase Admin SDK
    admin
      .messaging()
      .send(payload)
      .then(response => {
        console.log('Notification sent successfully:', response);
        res.status(200).send('Notification sent');
      })
      .catch(error => {
        console.error('Error sending notification:', error);
        res.status(500).send('Failed to send notification');
      });
};
