// pages/login_accedit/login_accedit.js
// 封装的登录模块
let loginUtil = require("../../utils/login.js")
const app = getApp();
const rootUrl = getApp().globalData.rootUrl;
const getuserTel = getApp().globalData.getuserTel;
const userLogin = getApp().globalData.userLogin;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },
  // 用户授权
  bindGetUserInfo: (res) => {
   
    // console.log("bindGetUserInfo获取权限", res)
    if (res.detail.userInfo) {
      // console.log(res.detail.userInfo);
      // 成功获取到权限，将用户信息存入全局变量
      // console.log("bindGetUserInfo获取用户信息成功！")

      getApp().globalData.userInfo = res.detail.userInfo

      // 登录
      // loginUtil.login();
      wx.navigateTo({
        url: '../home/equipment_warning/equipment_warning',
      })
      
      

    } else {
      // console.log("bindGetUserInfo获取用户信息失败!")

      wx.showToast({
        title: '您想正常使用，请先授权哦!',
        icon: 'none', // "success", "loading", "none"
        duration: 2000,
        mask: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})