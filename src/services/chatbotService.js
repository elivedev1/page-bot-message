import dotenv from "dotenv";
import request from "request";

dotenv.config();

const ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const IMAGE_GET_STARTED =
  "https://i.pinimg.com/564x/dc/51/53/dc5153cb6aadb9492f65ddfb18b30550.jpg";
const IMAGE_MAIN_MENU_1 =
  "https://i.pinimg.com/564x/7f/b5/b8/7fb5b84e5736df57e76cdf594d9c0123.jpg";
const IMAGE_MAIN_MENU_2 =
  "https://i.pinimg.com/564x/f5/87/48/f58748152feecf6e2b778d9e573714e5.jpg";
const IMAGE_MAIN_MENU_3 =
  "https://i.pinimg.com/236x/67/45/91/6745910f00688d4e49ab86be2e5db06b.jpg";
const IMAGE_LUNCH_MENU_1 =
  "https://i.pinimg.com/236x/11/4c/63/114c638dceaf1c640004c9307af18e85.jpg";
const IMAGE_LUNCH_MENU_2 =
  "https://cakholangvudai.com/wp-content/uploads/2015/01/cachepgionchienxu2.jpeg";
const IMAGE_LUNCH_MENU_3 =
  "https://i.pinimg.com/564x/4c/99/76/4c9976ce977a2f14f32966a949f42396.jpg";
const IMAGE_DINNER_MENU_1 =
  "https://i.pinimg.com/564x/4c/99/76/4c9976ce977a2f14f32966a949f42396.jpg";
const IMAGE_DINNER_MENU_2 =
  "https://cakholangvudai.com/wp-content/uploads/2015/01/cachepgionchienxu2.jpeg";
const IMAGE_DINNER_MENU_3 =
  "https://i.pinimg.com/564x/7f/b5/b8/7fb5b84e5736df57e76cdf594d9c0123.jpg";
const IMAGE_DETAIL_ROOMS =
  "https://i.pinimg.com/236x/54/ef/0b/54ef0bcdb641a97d136d4380afef3245.jpg";

const IMAGE_GIF_WELCOME =
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGV0MmVncWMwdmQybnZ6cWluYTFlczNzODQ1OWd1aDU3OHRjZHA5OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/osjgQPWRx3cac/giphy.gif";
const GUIDE_TO_USE_VIDEO =
  "https://business.facebook.com/247044418494034/videos/1792987324527051";
export const callSendAPI = async (sender_psid, response) => {
  return new Promise(async (resolve, reject) => {
    try {
      let request_body = {
        recipient: {
          id: sender_psid,
        },
        message: response,
      };

      await sendMarkReadMessage(sender_psid);
      await sendTypingOn(sender_psid);

      // Send the HTTP request to the Messenger Platform
      request(
        {
          url: "https://graph.facebook.com/v20.0/me/messages",
          qs: { access_token: ACCESS_TOKEN },
          method: "POST",
          json: request_body,
        },
        (err, res, body) => {
          console.log(body);
          if (!err) {
            resolve("MESSAGE SENT !");
            console.log("----------------------------------------------------");
          } else {
            console.error("ERROR" + err);
            console.log("----------------------------------------------------");
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

export const getUserName = (sender_psid) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${ACCESS_TOKEN}`,
        method: "GET",
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body);
          let username = `${body.last_name} ${body.first_name}`;
          resolve(username);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
};
export const handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let username = await getUserName(sender_psid);
      let response1 = {
        text: `Chào mừng bạn ${username} đến với kênh chúng tôi`,
      };
      // let response2 = getStartedTemplate(sender_psid);

      // send an image
      let response2 = getImageGetStartedTemplate(sender_psid);

      // send quick reply
      let response3 = getStartedQuickReplyTemplate(sender_psid);

      // api send welcome
      await callSendAPI(sender_psid, response1);

      // api send gif welcome
      await callSendAPI(sender_psid, response2);

      // api send quick reply
      await callSendAPI(sender_psid, response3);

      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};

export const handleSendMainMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getMainMenuTemplate(sender_psid);

      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};

export const handleSendLunchMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getLunchMenuTemplate();

      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};
export const handleSendDinnerMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDinnerMenuTemplate();

      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};

export const handleBackToMainMenu = async (sender_psid) => {
  await handleSendMainMenu(sender_psid);
};

export const handleDetailViewAppertizer = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewAppertizerTemplate();

      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};
export const handleDetailViewFish = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewFishTemplate();

      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};
export const handleDetailViewMeat = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewMeatTemplate();

      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};

export const handleShowDetailRooms = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      //
      let response1 = getImageRoomsTemplate();
      let response2 = getButtonRoomsTemplate();

      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);

      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};

export const sendMessage = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      //
      let response1 = getImageRoomsTemplate();
      let response2 = getButtonRoomsTemplate(sender_psid);

      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);

      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};

const sendTypingOn = (sender_psid) => {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: "typing_on",
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
      } else {
        console.error("SEND TYPE ERROR :" + err);
      }
    }
  );
};
let getImageRoomsTemplate = () => {
  let response = {
    attachment: {
      type: "image",
      payload: {
        url: IMAGE_DETAIL_ROOMS,
        is_reusable: true,
      },
    },
  };
  return response;
};

let getButtonRoomsTemplate = (sender_psid) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "Nhà hàng có thể phục vụ tối đa 300 khách",
        buttons: [
          {
            type: "postback",
            title: "MENU CHÍNH",
            payload: "MAIN_MENU",
          },
          {
            type: "web_url",
            url: `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
            title: "ĐẶT BÀN",
            webview_height_ratio: "full",
            messenger_extensions: true,
          },
        ],
      },
    },
  };
  return response;
};

const sendMarkReadMessage = (sender_psid) => {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: "mark_seen",
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
      } else {
        console.error("SEND MARK READ ERROR:" + err);
      }
    }
  );
};

const getStartedTemplate = (sender_psid) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Xin chào bạn đến với kênh của chúng tôi",
            subtitle: "Dưới đây là các lựa chọn",
            image_url: IMAGE_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "MENU CHÍNH",
                payload: "MAIN_MENU",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                title: "ĐẶT BÀN",
                webview_height_ratio: "full",
                messenger_extensions: true,
              },
              {
                type: "postback",
                title: "HD SỬ DỤNG BOT",
                payload: "GUIDE_TO_USE",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

const getImageGetStartedTemplate = (sender_psid) => {
  let response = {
    attachment: {
      type: "image",
      payload: {
        url: IMAGE_GIF_WELCOME,
        is_reusable: true,
      },
    },
  };
  return response;
};

const getStartedQuickReplyTemplate = () => {
  let response = {
    text: "Dưới đây là các lựa chọn :",
    quick_replies: [
      {
        content_type: "text",
        title: "MENU CHÍNH",
        payload: "MAIN_MENU",
      },
      {
        content_type: "text",
        title: "HD SỬ DỤNG BOT",
        payload: "GUIDE_TO_USE",
      },
    ],
  };
  return response;
};

export const handleGuideToUseBot = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const username = await getUserName(sender_psid);
      const response1 = {
        text: `Xin chào bạn ${username}, mình là chatbot.\n Để biết thêm thông tin bạn vui lòng xem video bên dưới 🤣.`,
      };
      //
      const response2 = getBotMediaTemplate();

      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);

      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};

const getBotMediaTemplate = () => {
  const response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "media",
        elements: [
          {
            // attachment_id: "1792987324527051",
            media_type: "video",
            url: GUIDE_TO_USE_VIDEO,
            buttons: [
              {
                type: "postback",
                title: "MENU CHÍNH",
                payload: "MAIN_MENU",
              },
              {
                type: "web_url",
                title: "Tham gia group",
                url: "https://www.youtube.com/",
                webview_height_ratio: "full",
              },
            ],
          },
        ],
      },
    },
  };

  return response;
};

const getMainMenuTemplate = (sender_psid) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Menu của chúng tôi",
            subtitle:
              "Chúng tôi hân hạnh mang đến cho bạn những trải nghiệm tuyệt vời",
            image_url: IMAGE_MAIN_MENU_1,
            buttons: [
              {
                type: "postback",
                title: "BỮA TRƯA",
                payload: "LUNCH_MENU",
              },
              {
                type: "postback",
                title: "BỮA TỐI",
                payload: "DINNER_MENU",
              },
              {
                type: "postback",
                title: "HD SỬ DỤNG BOT",
                payload: "GUIDE_TO_USE",
              },
            ],
          },
          {
            title: "Giờ mở cửa",
            subtitle:
              "Chúng tôi hân hạnh mang đến cho bạn những trải nghiệm tuyệt vời",
            image_url: IMAGE_MAIN_MENU_2,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                title: "ĐẶT BÀN",
                webview_height_ratio: "full",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Không gian nhà hàng",
            subtitle: "Nhà hàng có sức chứa lên đến 300 khách",
            image_url: IMAGE_MAIN_MENU_3,
            buttons: [
              {
                type: "postback",
                title: "Chi Tiết",
                payload: "SHOW_ROOMS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

const getLunchMenuTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Món tráng miệng",
            subtitle: "Nhà hàng có nhiều món tráng miệng hấp dẫn",
            image_url: IMAGE_LUNCH_MENU_1,
            buttons: [
              {
                //VIEW_APPERTIZER
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_APPERTIZER",
              },
            ],
          },
          {
            title: "Cá bảy chép",
            subtitle: "Cá tươi",
            image_url: IMAGE_LUNCH_MENU_2,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_FISH",
              },
            ],
          },
          {
            title: "Thịt hun khói",
            subtitle: "Đảm bảo chất lượng",
            image_url: IMAGE_LUNCH_MENU_3,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_MEAT",
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại Menu chính",
            image_url: IMAGE_LUNCH_MENU_3,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_MAIN_MENU",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

const getDinnerMenuTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Món tráng miệng",
            subtitle: "Nhà hàng có nhiều món tráng miệng hấp dẫn",
            image_url: IMAGE_DINNER_MENU_1,
            buttons: [
              {
                //VIEW_APPERTIZER
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_APPERTIZER",
              },
            ],
          },
          {
            title: "Cá bảy chép",
            subtitle: "Cá tươi",
            image_url: IMAGE_DINNER_MENU_2,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_FISH",
              },
            ],
          },
          {
            title: "Thịt hun khói",
            subtitle: "Đảm bảo chất lượng",
            image_url: IMAGE_DINNER_MENU_3,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_MEAT",
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại Menu chính",
            image_url: IMAGE_LUNCH_MENU_3,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_MAIN_MENU",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

const getDetailViewAppertizerTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Dưa hấu",
            subtitle: "50.000/1Kg",
            image_url: IMAGE_DINNER_MENU_1,
          },
          {
            title: "Xoài",
            subtitle: "20.000/1Kg",
            image_url: IMAGE_DINNER_MENU_2,
          },
          {
            title: "Ổi",
            subtitle: "30.000/1Kg",
            image_url: IMAGE_DINNER_MENU_3,
          },
          {
            title: "Quay Trở Lại",
            subtitle: "Quay trở lại main menu",
            image_url: IMAGE_DINNER_MENU_3,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_MAIN_MENU",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

const getDetailViewFishTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Cá Hồi",
            subtitle: "50.000/1Kg",
            image_url: IMAGE_DINNER_MENU_1,
          },
          {
            title: "Cá Lóc",
            subtitle: "20.000/1Kg",
            image_url: IMAGE_DINNER_MENU_2,
          },
          {
            title: "Cá Mặn",
            subtitle: "30.000/1Kg",
            image_url: IMAGE_DINNER_MENU_3,
          },
          {
            title: "Quay Trở Lại",
            subtitle: "Quay trở lại main menu",
            image_url: IMAGE_DINNER_MENU_3,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_MAIN_MENU",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

const getDetailViewMeatTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Thịt Heo",
            subtitle: "50.000/1Kg",
            image_url: IMAGE_DINNER_MENU_1,
          },
          {
            title: "Thịt Bò",
            subtitle: "20.000/1Kg",
            image_url: IMAGE_DINNER_MENU_2,
          },
          {
            title: "Thịt Lợn",
            subtitle: "30.000/1Kg",
            image_url: IMAGE_DINNER_MENU_3,
          },
          {
            title: "Quay Trở Lại",
            subtitle: "Quay trở lại main menu",
            image_url: IMAGE_DINNER_MENU_3,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ LẠI",
                payload: "BACK_TO_MAIN_MENU",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
