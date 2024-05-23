import dotenv from "dotenv";
import request from "request";

dotenv.config();
const ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const callSendAPI = (sender_psid, response) => {
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
const getUserName = async (sender_psid) => {
  let username = "";
  // Send the HTTP request to the Messenger Platform
  await request(
    {
      url: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${ACCESS_TOKEN}`,
      qs: { access_token: ACCESS_TOKEN },
      method: "GET",
    },
    (err, res, body) => {
      console.log(body);
      if (!err) {
        let response = JSON.parse(res);
        username = `${response.first_name} ${response.last_name}`;
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
  return username;
};
export const handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let username = await getUserName(sender_psid);
      let response = {
        text: `Ok. Chào mừng bạn ${username} đến với chúng tôi`,
      };
      await callSendAPI(sender_psid, response);
      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};
