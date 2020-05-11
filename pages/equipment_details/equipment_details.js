const app = getApp();
const rootUrl = app.globalData.rootUrl;
const informationAbstracts = app.globalData.informationAbstracts;
const socketUrl = app.globalData.socketUrl;
// let openSocket = require('../../config/socket')
const io = require('../../utils/weapp.socket.io.js')
const getDataFromTsdb = app.globalData.getDataFromTsdb;
const equipmentDetail = app.globalData.equipmentDetail;
const getChannelKey = app.globalData.getChannelKey;
const sendOrder = app.globalData.sendOrder;
import { $wuxDialog } from '../../dist/index'
const checkPassword = app.globalData.checkPassword;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput1: true,
    hiddenmodalput2: true,
    hiddenmodalput3: true,
    hiddenmodalput4: true,
    hiddenmodalput5: true,
    ids:'',
    last_run_time:'',
    url:'',
    list: [],
    firstList: [],
    state: 2,
    is_online: '',
    // if_grey : '',
    value1: false,
    value2: false,
    value3: false,
    value4: false,
    value5: false,
    value6 : false,
    type:'',
    internet_number:'',
    channel_key:'',
    state_switch:'',
    state_num:'',
    password: '',
    passwords: '',
    if_value1: 2,
    if_value2: 2,
    if_value3: 2,
    if_value4: 2,
    if_value5: 2,

    if_values1: 2,
    if_values2: 2,
    if_values3: 2,
    if_values4: 2,
    if_values5: 2,
  },

  onChange(field, e) {
    this.setData({
      [field]: e.detail.value
    })
  },
  onChange1(e) {
    var that = this;
    this.onChange('value1', e)
    that.setData({
      if_value1: e.detail.value,
    })
    if (that.data.if_value1 == false) {
      that.setData({
        if_values1:2
      })
    }
    if (that.data.if_value1 == true){
      that.setData({
        if_values1: 1
      })
    }else{
      that.setData({
        if_values1: 0
      })
    }
  },
  onChange2(e) {
    var that = this;
    this.onChange('value2', e)
    that.setData({
      if_value2: e.detail.value,
    })
    if (that.data.if_value2 == false) {
      that.setData({
        if_values2: 2
      })
    }
    if (that.data.if_value2 == true) {
      that.setData({
        if_values2: 1
      })
    } else {
      that.setData({
        if_values2: 0
      })
    }

  },
  onChange3(e) {
    var that = this;
    this.onChange('value3', e)
    that.setData({
      if_value3: e.detail.value,
    })
    if (that.data.if_value3 == false) {
      that.setData({
        if_values3: 2
      })
    }
    if (that.data.if_value3 == true) {
      that.setData({
        if_values3: 1
      })
    } else {
      that.setData({
        if_values3: 0
      })
    }
  },
  onChange4(e) {
    var that = this;
    this.onChange('value4', e)
    that.setData({
      if_value4: e.detail.value,
    })
    if (that.data.if_value4 == false) {
      that.setData({
        if_values4: 2
      })
    }
    if (that.data.if_value4 == true) {
      that.setData({
        if_values4: 1
      })
    } else {
      that.setData({
        if_values4: 0
      })
    }
  },
  onChange5(e) {
    var that = this;
    this.onChange('value5', e)
    that.setData({
      if_value5: e.detail.value,
    })
    if (that.data.if_value5 == false) {
      that.setData({
        if_values5: 2
      })
    }
    if (that.data.if_value5 == true) {
      that.setData({
        if_values5: 1
      })
    } else {
      that.setData({
        if_values5: 0
      })
    }
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
    var that = this;
    this.setData({
      ids: options.id,
    });
    let socketOpen = false
    const socketMsgQueue = []
    that.getfirst();
    that.getdetail();
 
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
    var that = this;
    const param = {
      id: that.data.ids,
    }
    wx.request({
      url: rootUrl + informationAbstracts,
      method: "get",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          // console.log(res.data.data);
          res.data.data.runTime = (res.data.data.runTime / (3600 * 1000)).toFixed(2)
          that.setData({
            allList: res.data.data,
            last_run_time: parseInt(res.data.data.last_run_time),
            is_online: res.data.data.is_online,
          });
          getApp().globalData.allList = that.data.allList;
        }

      },
      
    });
    if (that.data.if_value1 == false) {
      that.setData({
        if_values1: 2,
        if_value1: true,
        value1: true,
      })
    }
    if (that.data.if_value1 == true) {
      that.setData({
        if_values1: 2,
        if_value1: false,
        value1 : false,
      })
    }
    that.setData({
      if_value1: that.data.if_value1
    })

    if (that.data.if_value2 == false) {
      that.setData({
        if_values2: 2,
        if_value2: true,
        value2: true,
      })
    }
    if (that.data.if_value2 == true) {
      that.setData({
        if_values2: 2,
        if_value2: false,
        value2: false,
      })
    }
    that.setData({
      if_value2: that.data.if_value2
    })

    if (that.data.if_value3 == false) {
      that.setData({
        if_values3: 2,
        if_value3: true,
        value3: true,
      })
    }
    if (that.data.if_value3 == true) {
      that.setData({
        if_values3: 2,
        if_value3: false,
        value3: false,
      })
    }
    that.setData({
      if_value3: that.data.if_value3
    })

    if (that.data.if_value4 == false) {
      that.setData({
        if_values4: 2,
        if_value4: true,
        value4: true,
      })
    }
    if (that.data.if_value4 == true) {
      that.setData({
        if_values4: 2,
        if_value4: false,
        value4: false,
      })
    }
    that.setData({
      if_value4: that.data.if_value4
    })

    if (that.data.if_value5 == false) {
      that.setData({
        if_values5: 2,
        if_value5: true,
        value5: true,
      })
    }
    if (that.data.if_value5 == true) {
      that.setData({
        if_values5: 2,
        if_value5: false,
        value5: false,
      })
    }
    that.setData({
      if_value5: that.data.if_value5
    })

    setTimeout(() => {
      const socket = io('https://socket.zzdelectric.com/?equipment_id=' + that.data.ids + '&type=' + 2);
    // console.log(socket);
    socket.on('news', d => {
      // console.log('received news: ', d);
    })
    socket.on('connect', d => {
      console.log('连接成功');
      // console.log(d);
    })
    socket.on('message', res => {
      console.log("socket通信获取仪表数据");
      // console.log(res);
      that.data.list = res;    
    })
      if (that.data.list) {
        that.data.state == 1;
      } else {
        that.data.state == 2;
      }
    socket.emit('news', { title: 'this is a news' });
    }, 100)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.onSocketOpen(function () {
      wx.closeSocket()
    })

    wx.onSocketClose(function (res) {
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { 

    wx.onSocketOpen(function () {
      wx.closeSocket()
    })

    wx.onSocketClose(function (res) {
    })

    
    wx.closeSocket();


  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    this.onShow(); 

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
  //首次加载
  getfirst(){
    var that = this;

    const param = {
      equipment_id: that.data.ids,
    }
    // 首次加载
    wx.request({
      url: rootUrl + getDataFromTsdb,
      method: "get",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          // console.log(res.data.data);
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i]['value'] == "") {
              res.data.data[i]['value'] = 0;
              that.data.state == 2;

            }
        
            if (res.data.data[i]['show_name'] == '1路运行状态') {
              if (res.data.data[i]['value'] == '' || res.data.data[i]['value'] == '关') {
                that.data.value1 = false;
              } else {
                that.data.value1 = true;
              }
            }
            if (res.data.data[i]['show_name'] == '2路运行状态') {
              if (res.data.data[i]['value'] == '' || res.data.data[i]['value'] == '关') {
                that.data.value2 = false;
              } else {
                that.data.value2 = true;
              }
            }
            if (res.data.data[i]['show_name'] == '3路运行状态') {
              if (res.data.data[i]['value'] == '' || res.data.data[i]['value'] == '关') {
                that.data.value3 = false;
              } else {
                that.data.value3 = true;
              }
            }
            if (res.data.data[i]['show_name'] == '4路运行状态') {
              if (res.data.data[i]['value'] == '' || res.data.data[i]['value'] == '关') {
                that.data.value4 = false;
              } else {
                that.data.value4 = true;
              }
            }
            if (res.data.data[i]['show_name'] == '5路运行状态') {
              if (res.data.data[i]['value'] == '' || res.data.data[i]['value'] == '关') {
                that.data.value5 = false;
              } else {
                that.data.value5 = true;
              }
            }
            if (res.data.data[i]['show_name'] == '1路高速运行') {
              if (res.data.data[i]['value'] == '' || res.data.data[i]['value'] == '关') {
                that.data.value1 = false;
              } else {
                that.data.value1 = true;
              }
            }
            if (res.data.data[i]['show_name'] == '2路高速运行') {
              if (res.data.data[i]['value'] == '' || res.data.data[i]['value'] == '关') {
                that.data.value2 = false;
              } else {
                that.data.value2 = true;
              }
            }
            if (res.data.data[i]['show_name'] == '3路高速运行') {
              if (res.data.dat[i]['value'] == '' || res.data.dat[i]['value'] == '关') {
                that.data.value3 = false;
              } else {
                that.data.value3 = true;
              }
            }
          }
          that.setData({
            firstList: res.data.data,

          });

        }

      },
    });

  },

    //设备详情
  getdetail(){
    var that = this;
    const param = {
      id: that.data.ids,
    }
    wx.request({
      url: rootUrl + equipmentDetail,
      method: "get",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          that.data.type = res.data.data.type;
          if (res.data.data.internet_number == null) {

          } else {
            that.data.internet_number = res.data.data.internet_number;
          }
          that.setData({
            type: res.data.data.type,
            internet_number: res.data.data.internet_number
          });
          // console.log(that.data.internet_number);
          that.getkey();
        }
      },
    })
  },
  //设备key值
  getkey() {
    var that = this;
    const param = {
      address: that.data.internet_number,
    }
    wx.request({
      url: rootUrl + getChannelKey,
      method: "get",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          that.data.channel_key = res.data.data.channel_key;
          that.setData({
            channel_key: res.data.data.channel_key,
          });
        }
      },
    })
  },
  //控制指令
  getorder() {
    var that = this;
    const param = {
      channel_key: that.data.channel_key,
      internet_number: that.data.internet_number,
      type: that.data.type,
      state_switch: that.data.state_switch,
      state_num: that.data.state_num
    }
    wx.request({
      url: rootUrl + sendOrder,
      method: "post",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          wx.showToast({
            title: '成功',
            icon: 'success', // "success", "loading", "none"
            duration: 2000,
            mask: true
          })
          if (param.state_num == 1) {
            that.setData({
              if_values1: 2,
            })
          }
          if(param.state_num == 2){
            that.setData({
              if_values2: 2,
            })
          }
          if (param.state_num == 3) {
            that.setData({
              if_values3: 2,
            })
          }
          if (param.state_num == 4) {
            that.setData({
              if_values4: 2,
            })
          }
          if (param.state_num == 5) {
            that.setData({
              if_values5: 2,
            })
          }
          setTimeout(() => {
            that.getfirst();
          }, 5000);
        }
      },
    })
  },


   // 跳转到设备曲线
  equipment_curve: function (e) {
    var Detailsid = e.currentTarget.dataset.id;
    // console.log('Detailsid:' + Detailsid);
    wx.navigateTo({
      url: '../equipment_curve/equipment_curve?id=' + Detailsid,
    })
  },
  //跳转到设备装置
  equipment_device: function (e) {
    var Detailsid = e.currentTarget.dataset.id;
    // console.log('Detailsid:' + Detailsid);
    wx.navigateTo({
      url: '../equipment_device/equipment_device?id=' + Detailsid,
    })
  },

  //保存
  enterButtonClick1(){
    this.savePassword1();
  },
  //取消
  cancelButtonClick1: function (e){
    var that =this;
    // console.log(that.data.if_value1);
    if (that.data.if_value1 == false){
      that.setData({
        if_values: 2,
        if_value1: true,
        value1 : true,
      })
    }
   if (that.data.if_value1 == true ) {
      that.setData({
        if_values1: 2,
        if_value1: false,
        value1 : false,
      })
    }
    // console.log(that.data.if_value1);
    // that.onShow();
  },
  //核验密码
    savePassword1(){
          var that = this;
          // that.password = response;
          const param = {
            password: that.data.contents,
            user_id: getApp().globalData.userId
          }
          wx.request({
            url: rootUrl + checkPassword,
            method: "post",
            data: param,
            success(res) {
              // console.log(res);
              if (res.data.code == 0) {
                if (that.data.if_value1 == true) {
                  that.data.state_switch = true;
                  that.data.state_num = 1;
                }
                if (that.data.if_value1 == false) {
                  that.data.state_switch = false;
                  that.data.state_num = 1;
                }
                that.getorder();
              } else {
                wx.showToast({
                  title: '密码不正确',
                  icon: 'none', // "success", "loading", "none"
                  duration: 2000,
                  mask: true,
                })
                if (that.data.if_value1 == false) {
                  that.setData({
                    if_values: 2,
                    if_value1: true,
                    value1: true,
                  })
                }
                if (that.data.if_value1 == true) {
                  that.setData({
                    if_values1: 2,
                    if_value1: false,
                    value1: false,
                  })
                }
                
              }

            },

          })
        },


   //保存
  enterButtonClick2() {
    this.savePassword2();
  },
  //取消
  cancelButtonClick2: function (e) {
    var that = this;
    // console.log(that.data.if_value2);
    if (that.data.if_value2 == false) {
      that.setData({
        if_values2: 2,
        if_value2: true,
        value2: true,
      })
    }
    if (that.data.if_value2 == true) {
      that.setData({
        if_values2: 2,
        if_value2: false,
        value2: false,
      })
    }
    // that.onShow();
  },
  //核验密码
  savePassword2() {
    var that = this;
    const param = {
      password: that.data.contents,
      user_id: getApp().globalData.userId
    }
    wx.request({
      url: rootUrl + checkPassword,
      method: "post",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          if (that.data.if_value2 == true) {
            that.data.state_switch = true;
            that.data.state_num = 2;
          }
          if (that.data.if_value2 == false) {
            that.data.state_switch = false;
            that.data.state_num = 2;
          }
          that.getorder();
        } else {
          wx.showToast({
            title: '密码不正确',
            icon: 'none', // "success", "loading", "none"
            duration: 2000,
            mask: true
          })
          if (that.data.if_value2 == false) {
            that.setData({
              if_values2: 2,
              if_value2: true,
              value2: true,
            })
          }
          if (that.data.if_value2 == true) {
            that.setData({
              if_values2: 2,
              if_value2: false,
              value2: false,
            })
          }
        }

      },

    })
  },

  //保存
  enterButtonClick3() {
    this.savePassword3();
  },
  //取消
  cancelButtonClick3: function (e) {
    var that = this;
    // console.log(that.data.if_value3);
    if (that.data.if_value3 == false) {
      that.setData({
        if_values3: 2,
        if_value3: true,
        value3: true,
      })
    }
    if (that.data.if_value3 == true) {
      that.setData({
        if_values3: 2,
        if_value3: false,
        value3: false,
      })
    }
    // that.onShow();
  },
  //核验密码
  savePassword3() {
    var that = this;
    const param = {
      password: that.data.contents,
      user_id: getApp().globalData.userId
    }
    wx.request({
      url: rootUrl + checkPassword,
      method: "post",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          if (that.data.if_value3 == true) {
            that.data.state_switch = true;
            that.data.state_num = 3;
          }
          if (that.data.if_value3 == false) {
            that.data.state_switch = false;
            that.data.state_num = 3;
          }
          that.getorder();
        } else {
          wx.showToast({
            title: '密码不正确',
            icon: 'none', // "success", "loading", "none"
            duration: 2000,
            mask: true
          })
          if (that.data.if_value3 == false) {
            that.setData({
              if_values3: 2,
              if_value3: true,
              value3: true,
            })
          }
          if (that.data.if_value3 == true) {
            that.setData({
              if_values3: 2,
              if_value3: false,
              value3: false,
            })
          }
        }

      },

    })
  },

  //保存
  enterButtonClick4() {
    this.savePassword4();
  },
  //取消
  cancelButtonClick4: function (e) {
    var that = this;
    if (that.data.if_value4 == false) {
      that.setData({
        if_values4: 2,
        if_value4: true,
        value4: true,
      })
    }
    if (that.data.if_value4 == true) {
      that.setData({
        if_values4: 2,
        if_value4: false,
        value4: false,
      })
    }
    // that.onShow();
  },
  savePassword4() {
    var that = this;
    const param = {
      password: that.data.contents,
      user_id: getApp().globalData.userId
    }
    wx.request({
      url: rootUrl + checkPassword,
      method: "post",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          if (that.data.if_value4 == true) {
            that.data.state_switch = true;
            that.data.state_num = 4;
          }
          if (that.data.if_value4 == false) {
            that.data.state_switch = false;
            that.data.state_num = 4;
          }
          that.getorder();
        } else {
          wx.showToast({
            title: '密码不正确',
            icon: 'none', // "success", "loading", "none"
            duration: 2000,
            mask: true
          })
          if (that.data.if_value4 == false) {
            that.setData({
              if_values4: 2,
              if_value4: true,
              value4: true,
            })
          }
          if (that.data.if_value4 == true) {
            that.setData({
              if_values4: 2,
              if_value4: false,
              value4: false,
            })
          }
        }

      },

    })
  },


  //保存
  enterButtonClick5() {
    this.savePassword5();
  },
  //取消
  cancelButtonClick5: function (e) {
    var that = this;
    // console.log(that.data.if_value5);
    if (that.data.if_value5 == false) {
      that.setData({
        if_values5: 2,
        if_value5: true,
        value5: true,
      })
    }
    if (that.data.if_value5 == true) {
      that.setData({
        if_values5: 2,
        if_value5: false,
        value5: false,
      })
    }
    // that.onShow();
  },
  savePassword5() {
    var that = this;
    const param = {
      password: that.data.contents,
      user_id: getApp().globalData.userId
    }
    wx.request({
      url: rootUrl + checkPassword,
      method: "post",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          if (that.data.if_value5 == true) {
            that.data.state_switch = true;
            that.data.state_num = 5;
          }
          if (that.data.if_value5 == false) {
            that.data.state_switch = false;
            that.data.state_num = 5;
          }
          that.getorder();
        } else {
          wx.showToast({
            title: '密码不正确',
            icon: 'none', // "success", "loading", "none"
            duration: 2000,
            mask: true
          })
          if (that.data.if_value5 == false) {
            that.setData({
              if_values5: 2,
              if_value5: true,
              value5: true,
            })
          }
          if (that.data.if_value5 == true) {
            that.setData({
              if_values5: 2,
              if_value5: false,
              value5: false,
            })
          }
        }

      },

    })
  },

  changeContent: function (e) {
    var that = this;
    that.setData({
      contents: e.detail.value
    });
  },
  //一路
  modalinput1: function () {
    var that = this;
    that.setData({
      hiddenmodalput1: !this.data.hiddenmodalput1,
      contents: '',
    })
  },
  //取消按钮
  cancel1: function (e) {
    var that = this;
    that.setData({
      hiddenmodalput1: true
    });
    // console.log(that.data.if_value1);
    if (that.data.if_value1 == false) {
      that.setData({
        if_values: 2,
        if_value1: true,
        value1: true,
      })
    }
    else if (that.data.if_value1 == true) {
      that.setData({
        if_values1: 2,
        if_value1: false,
        value1: false,
      })
    } else {

    }
    // that.onShow();
  },

  //确认
  confirm1: function () {
    this.setData({
      hiddenmodalput1: true
    })
    this.savePassword1();
  },

  //二路
  modalinput2: function () {
    var that = this;
    that.setData({
      hiddenmodalput2: !this.data.hiddenmodalput2,
      contents: '',
    })
  },
  cancel2: function (e) {
    var that = this;
    that.setData({
      hiddenmodalput2: true
    });
    if (that.data.if_value2 == false) {
      that.setData({
        if_values2: 2,
        if_value2: true,
        value2: true,
      })
    }
    else if (that.data.if_value2 == true) {
      that.setData({
        if_values2: 2,
        if_value2: false,
        value2: false,
      })
    }else{

    }
    // that.onShow();
  },
  //确认
  confirm2: function () {
    this.setData({
      hiddenmodalput2: true
    })
    this.savePassword2();
  },
  //三路
  modalinput3: function () {
    var that = this;
    that.setData({
      hiddenmodalput3: !this.data.hiddenmodalput3,
      contents: '',
    })
  },
  cancel3: function (e) {
    var that = this;
    that.setData({
      hiddenmodalput3: true
    });
    if (that.data.if_value3 == false) {
      that.setData({
        if_values3: 2,
        if_value3: true,
        value3: true,
      })
    }
    else if (that.data.if_value3 == true) {
      that.setData({
        if_values3: 2,
        if_value3: false,
        value3: false,
      })
    }else{

    }
    // that.onShow();
  },
  //确认
  confirm3: function () {
    this.setData({
      hiddenmodalput3: true
    })
    this.savePassword3();
  },
  //四路
  modalinput4: function () {
    var that = this;
    that.setData({
      hiddenmodalput4: !this.data.hiddenmodalput4,
      contents: '',
    })
  },
  //取消
  cancel4: function (e) {
    var that = this;
    that.setData({
      hiddenmodalput4: true
    });
    // console.log(that.data.if_value4);
    if (that.data.if_value4 == false) {
      that.setData({
        if_values4: 2,
        if_value4: true,
        value4: true,
      })
    }
    else if (that.data.if_value4 == true) {
      that.setData({
        if_values4: 2,
        if_value4: false,
        value4: false,
      })
    }else{

    }
    // that.onShow();
  },
  //确认
  confirm4: function () {
    this.setData({
      hiddenmodalput4: true
    })
    this.savePassword4();
  },
  //五路
  modalinput5: function () {
    var that = this;
    that.setData({
      hiddenmodalput5: !this.data.hiddenmodalput5,
      contents: '',
    })
  },
  cancel5: function (e) {
    var that = this;
    that.setData({
      hiddenmodalput5: true
    });
    if (that.data.if_value5 == false) {
      that.setData({
        if_values5: 2,
        if_value5: true,
        value5: true,
      })
    }
    else if (that.data.if_value5 == true) {
      that.setData({
        if_values5: 2,
        if_value5: false,
        value5: false,
      })
    }else{

    }
    // that.onShow();
  },
  //确认
  confirm5: function () {
    this.setData({
      hiddenmodalput5: true
    })
    this.savePassword5();
  },
        

})