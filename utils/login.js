const app = getApp();
const rootUrl = app.globalData.rootUrl;
const imgUrl = app.globalData.imgUrl;
const getOpenId = app.globalData.getOpenId;

function login() {
  // console.log("登陆请求获取openid")
  wx.checkSession({
    success() {
      //session_key 未过期，并且在本生命周期一直有效
    },
    fail() {
      // session_key 已经失效，需要重新执行登录流程
      wx.login() //重新登录
    }
  })
  // 登录
  wx.login({
    success: res => {
      console.log("wx.login.code", res)
      // 发送 res.code 到后台换取 openId, sessionKey,返回openid保存
      wx.request({
        url: rootUrl + getOpenId,
        data: {
          code: res.code,
          account: getApp().globalData.account,
          // 将用户信息传到服务器保存
          // userInfo: getApp().globalData.userInfo
        },
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        method: 'get',
        success(res) {
          console.log("成功", res);
          // 获取到openid后将openid存入本地,同时放到全局变量里
          getApp().globalData.openId = res.data.data.uuid;
          getApp().globalData.sessionKey = res.data.data.session_key;
          getApp().globalData.id = res.data.data.id;
          getApp().globalData.account = res.data.data.account;
          wx.setStorage({
            key: 'openid',
            data: res.data.data.uuid
          })
          wx.setStorage({
            key: 'session_key',
            data: res.data.data.session_key
          })

          wx.hideLoading()
          // 然后跳转主页面
          wx.redirectTo({
            url: '/pages/home/home'
          })
        },
        fail(res) {
          wx.hideLoading()
          // wx.showToast({
          //   title: '请求失败',
          //   icon: 'none', // "success", "loading", "none"
          //   duration: 1500,
          //   mask: false
          // })
        }
      })
      // request请求结束
    }
  })
};

module.exports = {
  login: login
}