// pushNotificationHelper.js

import toast from "react-hot-toast";
import { useRouter } from 'next/router';
 import { useCreatePushNotificationMutation } from '../../../redux/features/pushNotification/pushNotificationApi';

const sendPushNotification = async (deviceTokens, formData, router, storeData) => {
   const [createPushNotification] = useCreatePushNotificationMutation();


  try {
    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      body: JSON.stringify({ registration_ids: deviceTokens, notification: formData, priority: "high" }),
      headers: {
        "Content-type": "application/json",
        "Authorization": `key=${process.env.NEXT_PUBLIC_PUSH_NOTIFICATION_SECRET_KEY}`
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      toast.error(responseData.message || "Something went wrong");
    } else {
      toast.success("Notification sent successfully!");

      if (storeData) {
        // store push notification on DB
        createPushNotification(storeData);
      }

      // Use the push function to navigate to a new route
      router.push('/notification/push-notification');
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export default sendPushNotification;
