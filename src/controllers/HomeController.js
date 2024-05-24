import dotenv from "dotenv";
import request from "request";
import {
  handleGetStarted,
  handleSendMainMenu,
  handleSendLunchMenu,
  handleSendDinnerMenu,
  handleBackToMainMenu,
  handleDetailViewAppertizer,
  handleDetailViewFish,
  handleDetailViewMeat,
  handleShowDetailRooms,
} from "../services/chatbotService.js";
dotenv.config();

const ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

export let getHomePage = (req, res) => {
  return res.render("homepage.ejs");
};
export let getWebhook = (req, res) => {
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    // Responds with '400 Bad Request' if mode or token is missing
    res.sendStatus(400);
  }
};
export let postWebhook = (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

export const handleMessage = (sender_psid, received_message) => {
  let response;

  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      text: `You sent the message: "${received_message.text}". Now send me an attachment!`,
    };
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachment_url,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes",
                },
                {
                  type: "postback",
                  title: "No!",
                  payload: "no",
                },
              ],
            },
          ],
        },
      },
    };
  }

  // Send the response message
  callSendAPI(sender_psid, response);
};

// Handles messaging_postbacks events
export const handlePostback = async (sender_psid, received_postback) => {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  switch (payload) {
    case "yes":
      response = { text: "Thanks!" };
      break;

    case "no":
      response = { text: "Oops, try sending another image." };
      break;

    case "RESTART_BOT":
    case "GET_STARTED":
      await handleGetStarted(sender_psid);
      break;

    case "MAIN_MENU":
      await handleSendMainMenu(sender_psid);
      break;

    case "LUNCH_MENU":
      await handleSendLunchMenu(sender_psid);
      break;

    case "DINNER_MENU":
      await handleSendDinnerMenu(sender_psid);
      break;

    case "VIEW_APPERTIZER":
      await handleDetailViewAppertizer(sender_psid);
      break;

    case "VIEW_FISH":
      await handleDetailViewFish(sender_psid);
      break;

    case "VIEW_MEAT":
      await handleDetailViewMeat(sender_psid);
      break;

    case "RESERVE_TABLE":
      // await handleSendDinnerMenu(sender_psid);
      break;

    case "SHOW_ROOMS":
      await handleShowDetailRooms(sender_psid);
      break;

    case "GUIDE_TO_USE":
      // await handleSendDinnerMenu(sender_psid);
      break;

    case "BACK_TO_MAIN_MENU":
      await handleBackToMainMenu(sender_psid);
      break;

    default:
      response = { text: `I don't know response with postback ${payload}` };
      break;
  }

  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
};

// Sends response messages via the Send API
export const callSendAPI = (sender_psid, response) => {
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

export const setupProfile = async (req, res) => {
  let request_body = {
    get_started: { payload: "GET_STARTED" },
    whitelisted_domains: ["https://page-bot-message.onrender.com/"],
  };

  // Send the HTTP request to the Messenger Platform
  await request(
    {
      url: `https://graph.facebook.com/v20.0/me/messenger_profile?access_token=${ACCESS_TOKEN}`,
      qs: { access_token: ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      console.log(body);
      if (!err) {
        console.log("setup use profile success!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );

  return res.send("setup use profile success!");
};

export const setupPersistantMenu = async (req, res) => {
  let request_body = {
    persistent_menu: [
      {
        locale: "default",
        composer_input_disabled: false,
        call_to_actions: [
          {
            // type: "postback",
            type: "web_url",
            title: "Youtube channel",
            url: "https://www.originalcoastclothing.com/",
            webview_height_ratio: "full",
          },
          {
            type: "web_url",
            title: "Nhóm FACEBOOK Tarot",
            url: "https://www.originalcoastclothing.com/",
            webview_height_ratio: "full",
          },
          {
            type: "postback",
            title: "Khởi động lại chat",
            payload: "RESTART_BOT",
          },
        ],
      },
    ],
  };

  // Send the HTTP request to the Messenger Platform
  await request(
    {
      url: `https://graph.facebook.com/v20.0/me/messenger_profile?access_token=${ACCESS_TOKEN}`,
      qs: { access_token: ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      console.log(body);
      if (!err) {
        console.log("setup use persistant menu success!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );

  return res.send("setup use persistant menu success!");
};

export const handleReserveTable = (req, res) => {
  return res.render("reserve-table.ejs");
};
export const handlePostReserveTable = async (req, res) => {
  console.log("!!! chạy hàm route");
  try {
    let customerName = "";
    if (req.body.customerName === "") {
      customerName = "Để Trống";
    } else {
      customerName = req.body.customerName;
    }

    // demo response with sample text
    // you can check database for customer order's status
    let response1 = {
      text: `---Thông tin khách hàng đặt bàn---
    \nHọ và tên: ${customerName}
    \nĐịa chỉ email: ${req.body.email}
    \nSố điện thoại: ${req.body.phoneNumber}`,
    };

    await callSendAPI(req.body.psid, response1);

    return res.status(200).json({
      message: "ok",
    });
  } catch (e) {
    console.log("Lỗi post reserver table error: " + e);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
