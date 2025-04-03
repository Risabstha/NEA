import axios from 'axios'
export const sendBulkSMS = async (req, res) => {
    console.log("Received SMS request:", req.body); // Debug: Check incoming data
    const { recipients, meetingDetails } = req.body;
  
    if (!recipients?.length) {
      return res.status(400).json({ error: "No recipients selected." });
    }
    
  
    try {
      // Prepare SMS message
      const message = `📢 Meeting Alert: Meeting Type: ${meetingDetails?.type || "N/A"} at ${meetingDetails?.location  ||
         "N/A"} on ${meetingDetails?.date || "N/A"} at time: ${meetingDetails?.time || "N/A"}. Details: ${meetingDetails?.description || "None"}`;
      console.log("Constructed message:", message); // Verify message content   
      const smsResponses = await Promise.all(
        recipients.map(async (phoneNumber) => {
          // Ensure phone number starts with +977
          const formattedNumber = phoneNumber.startsWith("+977") ? phoneNumber : `+977${phoneNumber}`;
          console.log("Attempting SMS to:", formattedNumber); // Verify number format
  
          const response = await axios.post(process.env.SPARROW_SMS_URL, null, {
            params: {
              token: process.env.SPARROW_TOKEN,
              from: process.env.SPARROW_FROM,
              to: formattedNumber,
              text: message,
            },
          });
          console.log("SMS API response:", response.data); // Log Sparrow's response
          return response.data;
        })
      );
  
      res.json({ message: "SMS sent successfully", details: smsResponses });
    } catch (error) {
        console.error("Sparrow API Error:", {
          message: error.message,
          response: error.response?.data, // Sparrow's error message
          status: error.response?.status,
          url: error.config?.url // Check the request URL
        });
        res.status(500).json({ error: "Failed to send SMS. Please try again." });
      }
  };
  