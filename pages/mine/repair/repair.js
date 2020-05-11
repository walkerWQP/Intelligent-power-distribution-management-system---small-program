// pages/mine/repair/repair.js
const app = getApp();
const rootUrl = getApp().globalData.rootUrl;
const fixList = getApp().globalData.fixList;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // addTimes:'',
    add_time:'',
    ids:'',
    firstList: [],
    page: 1,
    informationsStop: false,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    this.setData({
      ids: options.id,
    });
    // console.log(that.data.ids);
    this.list();
    wx.stopPullDownRefresh();

  },

  list(){
    var that = this;
    const param = {
      staff_id: that.data.ids,
      pageNum: that.data.page,

    }
    // console.log(param);
    wx.request({
      url: rootUrl + fixList,
      method: "get",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          for (let i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].add_time = parseInt(res.data.data.list[i].add_time)
            that.setData({
              firstList: res.data.data.list,
              add_time: res.data.data.list[i].add_time,
            });
            if (res.data.data.list[i].title == null) {
              res.data.data.list[i].title = '无';
            }
            if (res.data.data.list[i].show_name == null) {
              res.data.data.list[i].show_name = '无';
            }
            if (res.data.data.list[i].type == null) {
              res.data.data.list[i].type = '无';
            }
            if (res.data.data.list[i].add_time == null) {
              res.data.data.list[i].add_time = '无';
            }
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

  // 跳转到维修详情
  repair_detail: function (e) {
    var Detailsid = e.currentTarget.dataset.id;
    var fix = e.currentTarget.dataset.fix;
    var fix_imd = e.currentTarget.dataset.fix_img;
    var equipment_id = e.currentTarget.dataset.equipment_id;
    var show_name = e.currentTarget.dataset.show_name;
    // console.log(fix);
    // console.log(fix_imd);
    // console.log('Detailsid:' + Detailsid);
    wx.navigateTo({
      url: '../repair_details/repair_details?id=' + Detailsid + '&equipment_id=' + equipment_id + '&show_name=' + show_name,
    })
  }, 
})