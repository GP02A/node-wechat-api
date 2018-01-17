# node-wechat-api

node.js implement of wechat api

## What node-wechat-api does

This project will get and save access_token and jsapi_ticket to independent files(token and wxjstk) every 7000s(7200 expire time). As well as provide ways to get the parameter that one will need when using wechat's JS-SDK. More info can be find at https://mp.weixin.qq.com/wiki

### Prerequisites

This is a Node.js module so you konow what I mean........
You will need to get your own appID and appsecret and set corresponding js url on wechat open plateform. Btw you can get a test accound that allow you to test all their apis, check here: https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login.

### Installing

1.install using npm

```
npm install @musaka/node-wechat-api
```

2.Create wechat-config.json under your project's root and put your appID and appsecret info in it.

```
//wechat-config.json
{
  "appId": "your appid here",
  "appSecret": "your appSecret here"
}
```

3.Create a token file under root directory.(as of 0.2.4, might not need in future versions)

4.In your project, require the module, and it will automatically refresh access_token and jsapi_ticket in token and wxjstk every 7000s. If you need to implement wechat's JS-SDK, you can call cjsconfig(url) function(url is the page url where you want to use JS-SDK). This function will return appid, timestamp, nonceStr, signature that you will need to pass to the wx.config in pages that need wechat's JS-SDK.
```
const wechatapi = require('@musaka/node-wechat-api')
app.get('/tools/bmi',function(req, res){
	const clientUrl = 'http://' + req.hostname + req.url;
	const jsconfig = wechatapi.cjsconfig(clientUrl);
	res.render('pages/tools/bmi',{title:'Body Mass Index', ai: jsconfig.appid, ts:jsconfig.timestamp, ns: jsconfig.nonceStr, sg:jsconfig.signature });
});
```
