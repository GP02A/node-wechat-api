'use strict';
const fs = require('fs');
const request = require('request');

//token
const token = fs.readFileSync('./token').toString();

//define ur menus here
var menus = {
  "button": [
    {
      "name": "Google",
      "sub_button": [
        {
          "type": "view",
          "name": "Google",
          "url": "http://google.com"
        }]
    }]
};

function createMenu() {
  let options = {
    url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token,
    form: JSON.stringify(menus),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  request.post(options, function (err, res, body) {
    if (err) {
      console.log(err)
    }else {
      console.log(body);
    }
  })

}

module.exports = createMenu;
