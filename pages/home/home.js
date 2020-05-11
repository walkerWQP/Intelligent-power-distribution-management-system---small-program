const app = getApp();
const rootUrl = app.globalData.rootUrl;
const equipmentList = app.globalData.equipmentList;
const overrunList = app.globalData.overrunList;
const getOpenId = app.globalData.getOpenId;
const fixList = getApp().globalData.fixList;

var sliderWidth = 106; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 下拉刷新
  
    count: 0,
    scrollTop: 0,
    pageNumRent: 1,
    sizeRent: 5,
    pageNumBuy: 1,
    sizeBuy: 5,
    // 判断是下拉还是上提
    isDown: true,
    isDownBuy: true,
    all_list:[],
    alert_list : [],
    firstList: [],
    informationsStop: false,
    page: 1,
    // apage: 1,
    // 搜索
    inputShowed: false,
    inputVal: "",
    // 导航
    tabs: ["全部设备", "报警设备"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    test: false,
    albumDisabled: true,
    bindDisabled: false,
    start_time: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 5000)

    var that = this;
    wx.startPullDownRefresh();
    that.getlogin();
    that.getcode();
    wx.stopPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      page: 1,
    })
    that.classTableData();
    that.alert();
    that.list();
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that =this;
    // console.log(getApp().globalData.sta);
      that.classTableData();
      that.alert();
      that.list();
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
 

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.informationsStop) {
      that.data.page++;
      that.classTableData();
      that.alert();
      that.list();
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

  /**
   * 搜索
   */
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    this.classTableData();
    this.alert();
    this.list();
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    this.classTableData();
    this.alert();
    this.list();
  },
  inputTyping: function (e) {
    // console.log(e);
    this.setData({
      inputVal: e.detail.value
    });
    this.classTableData();
    this.alert();
    this.list();
  },


  getlogin: function () {
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
            if (res.data.code == 0) {
              if (res.data.data != null) {
                getApp().globalData.affirm = 1;
                getApp().globalData.avatarUrl = res.data.data.user_img;
                getApp().globalData.nickName = res.data.data.name;
                getApp().globalData.name = res.data.data.name;
                getApp().globalData.session_key = res.data.data.session_key;
                getApp().globalData.openId = res.data.data.uuid;
                getApp().globalData.villageId = res.data.data.village_id;
                getApp().globalData.userId = res.data.data.id;
              }
              wx.clearStorage()
              that.setData({
                open_id: res.data.obj
              })
              getApp().globalData.open_id = res.data.obj;
             
              wx.hideLoading()
              // 然后跳转主页面
            } else {

            }
          },

        })
      }
    })
  },



//全部设备
classTableData(){
  var that = this;
  const param = {
    villageId: getApp().globalData.villageId,
    content: that.data.inputVal,
    pageNum: that.data.page,

  }
  // 全部设备
  wx.request({
    url: rootUrl + equipmentList,
    method: "get",
    data: param,
    success(res) {
      // console.log(res);
      if (res.data.code == 0) {
        for (let i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i]['runTime'] = (res.data.data.list[i]['runTime'] / (3600 * 1000)).toFixed(2)
        }
        setTimeout(function () {
          wx.stopPullDownRefresh()
        }, 1500)
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
            all_list: res.data.data.list
          })
        } else {
          for (let a = 0; a < res.data.data.list.length; a++) {
            that.data.all_list.push(res.data.data.list[a]);
          }
          that.setData({
            all_list: that.data.all_list
          })
        }
      }
    },
  });
},

//报警
alert(){
  var that = this;
  // 报警设备
  const params = {
    village_id: getApp().globalData.villageId,
    content: that.data.inputVal,
    pageNum: that.data.page,

  }
  wx.request({
    url: rootUrl + overrunList,
    method: "get",
    data: params,
    success(res) {
      // console.log(res);
      if (res.data.code == 0) {
        for (let i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i]['continueTime'] = (res.data.data.list[i]['continueTime'] / (3600 * 1000)).toFixed(2);
          res.data.data.list[i].start_time = parseInt(res.data.data.list[i].start_time)
          that.setData({
            start_time: res.data.data.list[i].start_time,
          });
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
        if (that.data.page == 1) {
          that.setData({
            alert_list: res.data.data.list
          })
        } else {
          for (let a = 0; a < res.data.data.list.length; a++) {
            that.data.alert_list.push(res.data.data.list[a]);
          }
          that.setData({
            alert_list: that.data.alert_list
          })
        }

      }
    },
  });

},

//已维修
  list() {
    var that = this;
    const param = {
      staff_id: getApp().globalData.userId,
      pageNum: that.data.page,
    }
    wx.request({
      url: rootUrl + fixList,
      method: "get",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          // console.log(res.data.data);
          for (let i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].add_time = parseInt(res.data.data.list[i].add_time)
            that.setData({
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

          }


        }
      },
    });
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
      url: '../mine/repair_details/repair_details?id=' + Detailsid + '&equipment_id=' + equipment_id + '&show_name=' + show_name,
    })
  },

  /**
   * 导航栏
   */
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  /**
   * 跳转到全部设备详情
   */
  goEquipmentDetails: function (e) {
    var Detailsid = e.currentTarget.dataset.id;
    // console.log('Detailsid:' + Detailsid);
    wx.navigateTo({
      url: '../select_parent/select_parent?id=?' + Detailsid,
    })
  },

  // 跳转到设备参数
  equipment_param: function (e) {
    var Detailsid = e.currentTarget.dataset.id;
    // console.log('Detailsid:' + Detailsid);
    wx.navigateTo({
      url: '../equipment_details/equipment_details?id=' + Detailsid,
    })
  },

  /**
   * 跳转到报警设备详情
   */
  goEquipmentWarning: function (e) {
    // console.log(e.currentTarget.dataset);
    var id = e.currentTarget.dataset.id;
    var show_name = e.currentTarget.dataset.show_name;
    var equipment_id = e.currentTarget.dataset.equipment_id;
    // console.log('id:' + id);
    // console.log('equipment_id:' + equipment_id);
    // console.log('show_name:' + show_name);
    wx.navigateTo({
      url: './equipment_warning/equipment_warning?id=' + id + '&show_name=' + show_name + '&equipment_id=' + equipment_id,
    })
  },


  getcode() {
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
          // console.log('登录失败！' + res.errMsg)
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




})