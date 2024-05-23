import dotenv from "dotenv";
import request from "request";

dotenv.config();

const ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const IMAGE_GET_STARTED =
  "https://tarot.com.vn/themes/tarot/assets/img/banner.png";
const IMAGE_MAIN_MENU_1 =
  "https://tarot.com.vn/themes/tarot/assets/img/banner.png";
const IMAGE_MAIN_MENU_2 =
  "https://tarot.com.vn/themes/tarot/assets/img/banner.png";
const IMAGE_MAIN_MENU_3 =
  "https://tarot.com.vn/themes/tarot/assets/img/banner.png";
const IMAGE_LUNCH_MENU_1 =
  "https://tarot.com.vn/themes/tarot/assets/img/banner.png";
const IMAGE_LUNCH_MENU_2 =
  "https://tarot.com.vn/themes/tarot/assets/img/banner.png";
const IMAGE_LUNCH_MENU_3 =
  "https://tarot.com.vn/themes/tarot/assets/img/banner.png";
const IMAGE_DINNER_MENU_1 =
  "https://tarot.com.vn/themes/tarot/assets/img/banner.png";
const IMAGE_DINNER_MENU_2 =
  "https://tarot.com.vn/themes/tarot/assets/img/banner.png";
const IMAGE_DINNER_MENU_3 =
  "https://tarot.com.vn/themes/tarot/assets/img/banner.png";

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
const getUserName = (sender_psid) => {
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
        text: `Ok. Chào mừng bạn ${username} đến với kênh chúng tôi`,
      };
      let response2 = getStartedTemplate();

      await callSendAPI(sender_psid, response1);

      await callSendAPI(sender_psid, response2);

      resolve("done");
    } catch (err) {
      reject(err);
    }
  });
};

export const handleSendMainMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getMainMenuTemplate();

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

const getStartedTemplate = () => {
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
                type: "postback",
                title: "ĐẶT",
                payload: "RESERVE_TABLE",
              },
              {
                type: "postback",
                title: "HƯỚNG DẪN SỬ DỤNG BOT",
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

const getMainMenuTemplate = () => {
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
                title: "HƯỚNG DẪN SỬ DỤNG BOT",
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
                type: "postback",
                title: "ĐẶT BÀN",
                payload: "RESERVE_TABLE",
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
        ],
      },
    },
  };
  return response;
};

const getBackToMainMenuTemplate = () => {
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
        ],
      },
    },
  };
  return response;
};
