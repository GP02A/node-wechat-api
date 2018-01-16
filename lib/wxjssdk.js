'use strict';
const fs = require('fs');
const request = require('request');
const load_config = fs.readFileSync("./wechat-config.json");
const config = JSON.parse(load_config);
const token = fs.readFileSync('./token').toString();
const reqUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi';
const crypto = require('crypto');

const sha1 = function (str) {
  var shasum = crypto.createHash("sha1");
  shasum.update(str);
  str = shasum.digest("hex");
  return str;
}

//generate Random value in hex format
function randomValueHex (len) {
  return crypto.randomBytes(Math.ceil(len/2))
  .toString('hex') // convert to hexadecimal format
  .slice(0,len);   // return required number of characters
}

//s3 get signature
const getSign = function (wxticket, noncestr, timestamp, clientUrl) {
  var sortData = "jsapi_ticket=" + wxticket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + clientUrl;
  console.log(sortData);
  var wxssha1 = sha1(sortData);
  return wxssha1;
};

exports.cjsconfig = function (clientUrl) {
  const wxticket = fs.readFileSync('./wxjstk').toString();
  const noncestr = randomValueHex (7); //generate 7 digit nonceStr
  const timestamp = Math.floor(Date.now()/1000);//wechat need 10 digit(second based) timestamp!!!!
  const signature = getSign(wxticket, noncestr, timestamp, clientUrl);
  return {
    appid: config.appId,
    timestamp: timestamp,
    nonceStr: noncestr,
    signature: signature
  };
};
