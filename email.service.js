const DAL = require("./DAL");
const moment = require("moment");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const CAMPAIGN_COL = "campaigns";
const ADS_COL = "ads";

module.exports = {
  sendEmails: () => {
    let time = moment().tz("Asia/Jerusalem").add(1, "days").format();
    DAL.Get(
      CAMPAIGN_COL,
      { expiration_date: { $lte: time }, isActive: true },
      (data) => {
        data.forEach(async (campaign) => {
          const banners = await getBanners(campaign.campaign_id);
          sendEmail(renderHTML(campaign, banners));
        });
      }
    );
  },
};

function getBanners(id) {
  return new Promise((res, rej) => {
    DAL.Get(ADS_COL, { campaign_id: id }, (data) => {
      res(data);
    });
  });
}

function renderHTML(campaign, banners) {
  let html = getText(campaign);
  banners.forEach((banner) => {
    html += `<p><img src='${banner.url}'></p>`;
  });
  return html;
}

function getText(campaign) {
  return `
    <div style="font-size:20px; direction: rtl">
    <p> <b> שם הקמפיין: </b> ${campaign.campaign_name} </p>
    <p> <b> תאור: </b> ${campaign.description} </p>
    <p> <b> תאריך התחלה:</b> ${campaign.starting_date.replace("T", " - ")} </p>
    <p> <b> תאריך סיום: </b> ${campaign.expiration_date.replace(
      "T",
      " - "
    )} </p>
    <p> <b> מספר ימים:</b> ${campaign.days} </p>
    <p> <b> מספר צפיות:</b> ${campaign.views - campaign.views_left} </p>
    <p> <b> מספר קליקים:</b> ${campaign.clicks - campaign.clicks} </p>
    </br>`;
}

function sendEmail(html) {
  const msg = {
    to: "pirsum770@gmail.com",
    from: "solipod8@gmail.com",
    subject: "קמפיין עומד להסתיים",
    html: html,
  };
  try {
    sgMail.send(msg);
  } catch (error) {
      console.log(error);
  }
}
