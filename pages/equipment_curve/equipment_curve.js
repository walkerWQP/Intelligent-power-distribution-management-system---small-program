// pages/equipment_curve/equipment_curve.js
const app = getApp();
var wxCharts =require('../../utils/wxcharts.js');
var daylineChart = null;
var yuelineChart = null;
const rootUrl = app.globalData.rootUrl;
const curveParamList = app.globalData.curveParamList;
const performanceCurve1 = app.globalData.performanceCurve1;
const io = require('../../utils/weapp.socket.io.js')
const socketUrl = app.globalData.socketUrl;
// import * as echarts from '../../ec-canvas/echarts';

const curveAdd = app.globalData.curveAdd;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    ids: '',
    village_id: '',
    equipment_id: '',
    village_id: '',
    selectParams:'',
    checkParam:[],
    checkParams: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    this.setData({
      equipment_id: options.id,
      village_id: getApp().globalData.villageId,
    });
    const param = {
      equipment_id: that.data.equipment_id,
      village_id: getApp().globalData.villageId,
    }
    wx.request({
      url: rootUrl + curveParamList,
      method: "get",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          that.data.paramList = res.data.data;
          that.setData({
            paramList: res.data.data,
          });
          that.setData({
            checkParams : (that.data.checkParam).join(",")
          });
        }
      },
    });


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

  
  // 跳转到参数设置
  param_setting: function (e) {
    var Detailsid = e.currentTarget.dataset.id;
    // console.log('Detailsid:' + Detailsid);
    wx.navigateTo({
      url: '../param_setting/param_setting?id=' + Detailsid,
    })
  },

  

  
  


})