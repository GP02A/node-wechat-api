
//refresh access_token and jsapi_ticket every 7000s(7200s expire time)
const getToken = require('./lib/token');
getToken.fulltokenrefresh();

const JSAPI = require('./lib/wxjssdk');
exports.cjsconfig = JSAPI.cjsconfig;

/* 'one time use' only(when u need to update menus of ur offical account)
const createMenu = require('./lib/wxCustomeMenu');
createMenu();
*/
