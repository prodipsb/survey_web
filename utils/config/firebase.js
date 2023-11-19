

import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';


const firebaseConfig = {
    apiKey: "AIzaSyD8qGoWJdJjMXV1xdmjxd_e3_z6XY0zrP8",
    authDomain: "surveypushnotification.firebaseapp.com",
    projectId: "surveypushnotification",
    storageBucket: "surveypushnotification.appspot.com",
    messagingSenderId: "760559770443",
    appId: "1:760559770443:web:6dcc7112575f847e0f26ce",
    measurementId: "G-EDSLFHD6CG"
  };



const app = initializeApp(firebaseConfig);

console.log('firebase app', app)

// If you want to use analytics
// const analytics = getAnalytics(app);

// Initialize messaging only on the client side
let messaging = null;
if (typeof window !== 'undefined') {
  messaging = getMessaging(app);
}



export { app, messaging };


