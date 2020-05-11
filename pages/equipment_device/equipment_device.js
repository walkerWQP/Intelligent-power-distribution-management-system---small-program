// pages/equipment_device/equipment_device.js
const app = getApp();
const rootUrl = app.globalData.rootUrl;
const equipmentLog = app.globalData.equipmentLog;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ids:'',
    firstList: [],
    addTime:'',
    informationsStop: false,
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      ids: options.id,
    });
    // console.log(this.data.ids);
    this.list();
    wx.stopPullDownRefresh();
  },

  list(){
    var that = this;
    const param = {
      id: that.data.ids,
      pageNum: that.data.page,
    }
    wx.request({
      url: rootUrl + equipmentLog,
      method: "get",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          setTimeout(function () {
            wx.stopPullDownRefresh()
          }, 1.5000)
          if (that.data.page < res.data.data.pages) {
            that.setData({
              informationsStop: true
            })
          } else {
            that.setData({
              informationsStop: false
            })
          }
          if (that.data.page == 1) {
            that.setData({
              firstList: res.data.data.list
            })
          } else {
            for (let a = 0; a < res.data.data.list.length; a++) {
              that.data.firstList.push(res.data.data.list[a]);
            }
            that.setData({
              firstList: that.data.firstList
            })
          }
          for (let i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].addTime = parseInt(res.data.data.list[i].addTime);
            that.setData({
              firstList: res.data.data.list,
              addTime: res.data.data.list[i].addTime,
            });
            // if (res.data.data.list[i].logType == 1) {
            //   res.data.data.list[i].logType = '开关机';
            // }
            // if (res.data.data.list[i].logType == 2) {
            //   res.data.data.list[i].logType = '报警';
            // }
            // if (res.data.data.list[i].logType == 3) {
            //   res.data.data.list[i].logType = '接入';
            // }
            // if (res.data.data.list[i].logType == 4) {
            //   res.data.data.list[i].logType = '入网';
            // }
            // if (res.data.data.list[i].logDetail == null) {
            //   res.data.data.list[i].logDetail = '无';
            // }
          }
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
    var that = this;
    that.setData({
      page: 1,
    })
    this.list();
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.informationsStop) {
      that.data.page++;
      this.list();
      
      that.setData({
        nomore: 0
      })
    }
    else {
      that.setData({
        nomore: 1
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 跳转到设备曲线
  equipment_curve: function (e) {
    var Detailsid = e.currentTarget.dataset.id;
    console.log('Detailsid:' + Detailsid);
    console.log(e);
    wx.navigateTo({
      url: '../equipment_curve/equipment_curve?id=' + Detailsid,
    })
  },
  //跳转到设备装置
  equipment_device: function (e) {
    var Detailsid = e.currentTarget.dataset.id;
    console.log('Detailsid:' + Detailsid);
    console.log(e);
    wx.navigateTo({
      url: '../equipment_device/equipment_device?id=' + Detailsid,
    })
  },
  //跳转到设备详情
  equipment_detail: function (e) {
    var Detailsid = e.currentTarget.dataset.id;
    console.log('Detailsid:' + Detailsid);
    console.log(e);
    wx.navigateTo({
      url: '../equipment_details/equipment_details?id=' + Detailsid,
    })
  },


})