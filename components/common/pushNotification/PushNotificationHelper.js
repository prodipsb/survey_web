import toast from "react-hot-toast";

const sendPushNotification = async (deviceTokens, formData) => {

  try {
    const payload = {
      registration_ids: deviceTokens,
      notification: formData,
      priority: "high"
    };

    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `key=${process.env.NEXT_PUBLIC_PUSH_NOTIFICATION_SECRET_KEY}`
      },
    });

    const responseData = await response.text(); // Use text() first to inspect the raw response

    // Try parsing the response data to JSON
    try {
      const jsonResponse = JSON.parse(responseData);
      if (!response.ok) {
        toast.error(jsonResponse.message || "Something went wrong");
      } else {
        toast.success("Notification sent to Mobile APP!");
      }
    } catch (jsonError) {
      console.error('Failed to parse JSON response:', jsonError);
      toast.error('Failed to parse response from the server.');
    }

  } catch (error) {
    console.error('Error:', error);
    toast.error(error.message);
  }
};

export default sendPushNotification;
