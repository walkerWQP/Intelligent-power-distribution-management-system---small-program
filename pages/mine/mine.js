// pages/mine/mine.js
const app = getApp();
const imgUrl = app.globalData.imgUrl;
const rootUrl = getApp().globalData.rootUrl;
const logOut = app.globalData.logOut;
const getAccessToken = app.globalData.getAccessToken;
const staffFixNum = getApp().globalData.staffFixNum;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,

    telephone: '0371-53623516',
    affirm: getApp().globalData.affirm,
    nickName: getApp().globalData.nickName,
    fix_num : '',
    content: '',
    contents: '',
    listData: [
      {
        className: "mycollect",
        content: "维修记录",
      }
    ],
    firstList:[],
    protocalHidden: true,
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
    this.setData({
      affirm: getApp().globalData.affirm
    })
    // console.log(this.setData);
    var that = this;

    if (this.data.affirm == 1 && this.data.nickName != "") {
      that.setData({
        nickName: getApp().globalData.nickName,
        // avatarUrl: getApp().globalData.userInfo.avatarUrl
      })
    }
    const param = {
      staff_id: getApp().globalData.userId,
    }
    // console.log(param);
    wx.request({
      url: rootUrl + staffFixNum,
      method: "get",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          that.setData({
            fix_num: res.data.data,
          });
        }
      },
    });
    
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
 * 跳到详情页
 */
  goToDetail: function (e) {
    // console.log(e);
      wx.navigateTo({
        url: '../login_accredit/login_accredit',
      })
  },

  /**
   * 拨打电话
   */
  to_call: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.telephone,
    })
  },

  /**
   * 跳到维修记录
   */
  goToDetail: function (e) {
    var Detailsid = getApp().globalData.userId;
    // console.log('Detailsid:' + Detailsid);
    wx.navigateTo({
      url: 'repair/repair?id=' + Detailsid,
    })
  },
 
  goTologin_Details: function () {
      wx.navigateTo({
        url: '../logs/logs',
      })
  },
  // 退出登陆
  showProtocal: function () {
    this.setData({
      protocalHidden: false
    });
  },
  hiddenModel: function () {
    this.setData({
      protocalHidden: true
    });
  },


  affirm: function () {
    // console.log('退出成功');
    this.setData({
      protocalHidden: true
    });
    wx.clearStorage()
    setTimeout(() => {
        wx.redirectTo({
            url: '/pages/logs/logs'
          })
    }, 150)
    this.checkout();

    getApp().globalData.affirm = 0;
    getApp().globalData.stas = 0;
    getApp().globalData.open_id = '';
    getApp().globalData.session_key = '';
    getApp().globalData.userInfo = '';
    getApp().globalData.nickName = '';
    getApp().globalData.villageId = '';
    getApp().globalData.account = '';
    getApp().globalData.equipment_id = '';
    getApp().globalData.allList = '';
    getApp().globalData.staff_id = '';
    getApp().globalData.selectedParams = '';
    getApp().globalData.name = '';
    console.log(getApp().globalData.affirm);
    console.log(getApp().globalData.open_id);
  },
  checkout: function () {
    let that = this;
      wx.request({
        url: rootUrl + logOut,
        method: 'post',
        data: {
          open_id: getApp().globalData.open_id,
        },
        success(res) {
          // console.log(res);
          if (res.data.code == 0) {
            wx.clearStorage()
            that.setData({
              userInfo: res.data.data,
            })
            // console.log(that.data.userInfo);
          }
        }
      })
  },

  //测试订阅消息
  // ceshi: function () {
  //   console.log('------订阅');
  //   wx.requestSubscribeMessage({
  //     tmplIds: ['IdD2pbIsuLFAI_6DNChiTTM0qToDJC5gFo0vX6qUQDU'],
  //     success(res) {
  //       console.log('已授权接收订阅消息')
  //       console.log(res);
  //     }
  //   })
  // },  
})