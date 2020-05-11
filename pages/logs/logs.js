const app = getApp();
const rootUrl = app.globalData.rootUrl;

const getOpenId = app.globalData.getOpenId;
const userLogin = app.globalData.userLogin;
const logOut = app.globalData.logOut;
let loginUtil = require("../../utils/login.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: '',
    passwords: '',
    open_id: '',
    sta : 1,
    stas: '',


  },

  // timeFly: function () {
  //   const that = this;
  //   const intervalId = setInterval(() => {
  //     const time = that.data.resteTime - 1;
  //     that.setData({
  //       resteTime: time
  //     });
  //     if (time == 0) {
  //       clearInterval(intervalId);
  //     }
  //   }, 1000);
  // },

  changeAccount: function (e) {
    this.setData({
      accounts: e.detail.value
    });
  },
  changePassword: function (e) {
    this.setData({
      passwords: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      // console.log(getApp().globalData.stas);
      if (getApp().globalData.stas == 1) {
        wx.showLoading({
          title: '正在自动登陆',
        })
      }
      this.getcode();
      this.getlogin();
    }, 1000)

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  /**
   * 登录按钮事件
   */
  
  getlogin: function(){
    var that = this;
    wx.login({
      success: res => {
        // console.log(res)
        const param = {
          code: res.code,
        }
        wx.request({
          url: rootUrl + getOpenId,
          data: param,
          method: 'get',
          success(res) {
            // console.log("成功", res);
            if (res.data.code == 0) {
              wx.clearStorage()
              that.setData({
                open_id: res.data.obj
              })
              getApp().globalData.open_id = res.data.obj;
             
              if (res.data.data != null){
                setTimeout(() => {
                  wx.switchTab({
                    url: '../home/home',
                  })
                }, 150)
                that.setData({
                  userInfo: res.data.data,
                })
                getApp().globalData.affirm = 1;
                getApp().globalData.avatarUrl = that.data.userInfo.user_img;
                getApp().globalData.nickName = that.data.userInfo.name;
                getApp().globalData.name = that.data.userInfo.name;
                getApp().globalData.session_key = that.data.userInfo.session_key;
                getApp().globalData.openId = that.data.userInfo.uuid;
                getApp().globalData.villageId = that.data.userInfo.village_id;
                getApp().globalData.userId = that.data.userInfo.id;
                wx.setStorage({
                  key: 'openid',
                  data: res.data.data.uuid
                })
                wx.setStorage({
                  key: 'session_key',
                  data: res.data.data.session_key
                })
              }else{
             
              }

             

            wx.hideLoading()
            // 然后跳转主页面
            } else {
        }
          },
          
        })

      }
    })
},


getcode(){
  wx.login({
    success(res) {
      if (res.code) {
        // console.log(res);
        //发起网络请求
        wx.request({
          url: 'https://test.com/onLogin',
          data: {
            code: res.code
          }
        })
      } else {

      }
    }
  })

    // 获取用户信息
    wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
      }
    }
  })
  },

  login: function () {
    let that = this;
    app.globalData.account = this.data.accounts;
     wx.request({
      url: rootUrl + userLogin,
      method: 'post',
      data: {
        account: that.data.accounts,
        password: that.data.passwords,  
        open_id: that.data.open_id,  
      },
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          if (res.data.data.id) {
            setTimeout(() => {
              wx.switchTab({
                url: '../home/home',
              })
            }, 150)
            that.setData({
              userInfo: res.data.data,
            })
            getApp().globalData.affirm = 1;
            getApp().globalData.avatarUrl = that.data.userInfo.user_img;
            getApp().globalData.nickName = that.data.userInfo.name;
            getApp().globalData.sta = that.data.sta;
            getApp().globalData.name = that.data.userInfo.name;
            getApp().globalData.session_key = that.data.userInfo.session_key;
            getApp().globalData.openId = that.data.userInfo.uuid;
            getApp().globalData.villageId = that.data.userInfo.village_id;
            getApp().globalData.userId = that.data.userInfo.id;
          } else {
          
          }
       
          wx.clearStorage()
          that.setData({
            userInfo: res.data.data,
          })
          getApp().globalData.affirm = 1;
          getApp().globalData.avatarUrl = that.data.userInfo.user_img;
          getApp().globalData.nickName = that.data.userInfo.name;
          getApp().globalData.name = that.data.userInfo.name;
          getApp().globalData.session_key = that.data.userInfo.session_key;
          getApp().globalData.open_id = that.data.userInfo.open_id;
          getApp().globalData.openId = that.data.userInfo.uuid;
          getApp().globalData.villageId = that.data.userInfo.village_id;
          getApp().globalData.userId = that.data.userInfo.id;
          wx.setStorage({
            key: "session_key",
            data: that.data.userInfo.session_key
          })
          wx.setStorage({
            key: "openId",
            data: that.data.userInfo.uuid
          })
          wx.showToast({
            title: '登陆成功',
            icon: 'success', // "success", "loading", "none"
            duration: 2000,
            mask: true
          })
          setTimeout(() => {
            wx.switchTab({
              url: '../home/home',
            })
          }, 150)

        } else {
          wx.showToast({
            // title: res.data.message,
            title: '账号或密码不正确',
            icon: 'none', // "success", "loading", "none"
            duration: 2000,
            mask: true
          })
        }

      }
    })
  },

  
 

})