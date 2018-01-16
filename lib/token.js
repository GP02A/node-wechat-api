'use strict';
//token and jsapi_ticket both have a 7200s expire time, code in this file will get and save both of them every 7000s
const request = require('request');
const fs = require('fs');
const load_config = fs.readFileSync("./wechat-config.json");
const config = JSON.parse(load_config);

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

//s1 save access_token
const saveToken = function () {
  getAccessToken().then(res => {
    let token = res['access_token'];
    fs.writeFile('./token', token, function (err) {
      if (err){
        console.log("Save access_token fail!!");
      } else {
        console.log("Step 1: access_token saved: "+token);
        savewxjstk();
      }
    });
  })
};

//s2 save jsapi_ticket
const savewxjstk = function () {
  getwxjstk().then(res => {
    let ticket = res['ticket'];
    fs.writeFile('./wxjstk', ticket, function (err) {
      if (err){
        console.log("Save jsapi_ticket fail!!");
      } else {
        console.log("Step 2: jsapi_ticket saved: "+ticket);
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
