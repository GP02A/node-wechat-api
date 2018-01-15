// load the things we need
var fs = require('fs');
const crypto = require('crypto');
//const wxconfig = require('./config');

//刷新timeStamp, signature, access_token
const getToken = require('./lib/token');
getToken.fulltokenrefresh();

const JSAPI = require('./lib/wxjssdk');
exports.cjsconfig = JSAPI.cjsconfig;
/*创建菜单
const createMenu = require('./wechat/wxCustomeMenu');
createMenu();
*/
