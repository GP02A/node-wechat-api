'use strict';
//token and jsapi_ticket both have a 7200s expire time, code in this file will get and save both of them every 7000s
const request = require('request');
const fs = require('fs');
const crypto = require('crypto');
const config = require('../config');

const sha1 = function (str) {
  var shasum = crypto.createHash("sha1");
  shasum.update(str);
  str = shasum.digest("hex");
  return str;
}

//get access_token
const getAccessToken = function () {
  let wxGetAccessTokenBaseUrl = 'https://api.weixin.qq.com/cgi-bin/token?'+'grant_type=client_credential&appid='+config.appId+'&secret='+config.appSecret;
  let options = {
    method: 'GET',
    url: wxGetAccessTokenBaseUrl
  };
  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        resolve(JSON.parse(body));
      } else {
        reject(err);
      }
    });
  })
};

//get jsapi_ticket
const getwxjstk = function () {
  var actoken = fs.readFileSync('./token', 'utf8');
  let wxGetwxjstkBaseUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+actoken+'&type=jsapi';
  let options = {
    method: 'get',
    url: wxGetwxjstkBaseUrl
  };
  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        resolve(JSON.parse(body));
      } else {
        reject(err);
      }
    });
  })
};

//全局载入timeStamp, signature, access_token
function fullWXload() {
  global.at = fs.readFileSync('token', 'utf8');
  global.ts = fs.readFileSync('wxsignts', 'utf8');
  global.sg = fs.readFileSync('wxsign', 'utf8');
  global.test = "test111";
  console.log("loaded access_token:" + at);
  console.log("loaded timeStamp:" + ts);
  console.log("loaded wxsign:" + sg);
}
//s1 save access_token
const saveToken = function () {
  getAccessToken().then(res => {
    let token = res['access_token'];
    fs.writeFile('./token', token, function (err) {
      if (err){
        console.log("Save access_token fail!!");
      } else {
        console.log("Step 1: access_token saved");
        savewxjstk();
      }
    });
  })
};

//s2 save jsapi_ticket
const savewxjstk = function () {
  getwxjstk().then(res => {
    let token = res['ticket'];
    fs.writeFile('./wxjstk', token, function (err) {
      if (err){
        console.log("Save jsapi_ticket fail!!");
      } else {
        console.log("Step 2: jsapi_ticket saved");

      }
    });
  })
};

const refreshToken = function () {
  saveToken();
  setInterval(function () {
    saveToken();
  }, 7000*1000);
};

exports.fulltokenrefresh = function () {
  refreshToken();
};
/*
module.exports = refreshwxjstk;
module.exports = refreshwxsign;
module.exports = refreshToken;
*/
