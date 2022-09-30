require('dotenv').config({path: '../.env'});

console.log(process.env);
module.exports = {
  // baseUrl: 'https://maccabitickets.co.il/',
  consecutiveSeats: 3,
  sites: {
    'Exit 10': {
      api: 'https://maccabitickets.co.il/Handlers/SeatingPlanStatuses.ashx?productId=8e1349dd-de93-ec11-80e7-984be16723b6&ptype=Series&area=6a23bf7a-2ed6-46b5-a277-42164bb0aece&seriesId=&promoDefId=&promoCode=&_=1657990734733',
      url: 'https://maccabitickets.co.il/he-IL/subscriptions/%D7%9E%D7%9B%D7%91%D7%99%20playtika%20%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91%202022-23?area=6a23bf7a-2ed6-46b5-a277-42164bb0aece&type=',
    },
    'Exit 1': {
      api: 'https://maccabitickets.co.il/Handlers/SeatingPlanStatuses.ashx?productId=8e1349dd-de93-ec11-80e7-984be16723b6&ptype=Series&area=ceafee13-7796-4da1-9e8f-3696ce80f709&seriesId=&promoDefId=&promoCode=&_=1657996557233',
      url: 'https://maccabitickets.co.il/he-IL/subscriptions/%D7%9E%D7%9B%D7%91%D7%99%20playtika%20%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91%202022-23?area=ceafee13-7796-4da1-9e8f-3696ce80f709&type=',
    },
    'Exit 4': {
      api: 'https://maccabitickets.co.il/Handlers/SeatingPlanStatuses.ashx?productId=8e1349dd-de93-ec11-80e7-984be16723b6&ptype=Series&area=b5cd9274-fdd4-4bfb-b3df-030bbf89ca94&seriesId=&promoDefId=&promoCode=&_=1657996679293',
      url: 'https://maccabitickets.co.il/he-IL/subscriptions/%D7%9E%D7%9B%D7%91%D7%99%20playtika%20%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91%202022-23?area=b5cd9274-fdd4-4bfb-b3df-030bbf89ca94&type=',
    },
    'Exit 7': {
      api: 'https://maccabitickets.co.il/Handlers/SeatingPlanStatuses.ashx?productId=8e1349dd-de93-ec11-80e7-984be16723b6&ptype=Series&area=3e9260ed-2e18-4b1c-8dce-c7ad2cffdede&seriesId=&promoDefId=&promoCode=&_=1657996709439',
      url: 'https://maccabitickets.co.il/he-IL/subscriptions/%D7%9E%D7%9B%D7%91%D7%99%20playtika%20%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91%202022-23?area=3e9260ed-2e18-4b1c-8dce-c7ad2cffdede&type=',
    },
  },
  email: {
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || ''
    },
    from: 'seat-finder@test.com',
    to: process.env.EMAIL_TO || '',
  }
};
