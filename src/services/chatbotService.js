import dotenv from "dotenv";
import request from "request";

dotenv.config();
const ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

export const callSendAPI = (res) => {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      url: "https://graph.facebook.com/v20.0/me/messages",
      qs: { access_token: ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};
export const handleGetStarted = () => {
  return Promise(async (resolve, reject) => {
    try {
      let response = { text: "Ok. Chào mừng bạn đến với chúng tôi" };
      await this.callSendAPI(response);
      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};
