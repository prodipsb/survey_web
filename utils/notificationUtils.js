// utils/notificationUtils.js

import toast from 'react-hot-toast';

export const sendPushNotification = async (deviceTokens, formData) => {
  try {
    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      body: JSON.stringify({ registration_ids: deviceTokens, notification: formData, priority: "high" }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `key=${process.env.NEXT_PUBLIC_PUSH_NOTIFICATION_SECRET_KEY}`
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      toast.error(responseData.message || "Something went wrong");
    } else {
      toast.success(formData);

    }
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  } 
};
