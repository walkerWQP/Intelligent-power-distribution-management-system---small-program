//app.js
const app = getApp();
App({
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
        var that = this;
    wx.login({
      success: res => {
        // console.log(res);
        const param = {
          code: res.code,
        }
        // console.log(param);
        wx.request({
          url: 'https://dev.zzdelectric.com/app/staff/getOpenid',
          data: param,
          header: {
            'content-type': 'application/json;                                            charset=utf-8', 
          },
          method: 'get',
          success(res) {
            // console.log("成功", res);
            if (res.data.code == 0) {
              // wx.clearStorage()
              if (res.data.data != null){
                getApp().globalData.affirm = 1;
                getApp().globalData.avatarUrl = res.data.data.user_img;
                getApp().globalData.nickName = res.data.data.name;
                getApp().globalData.name = res.data.data.name;
                getApp().globalData.session_key = res.data.data.session_key;
                getApp().globalData.openId = res.data.data.uuid;
                getApp().globalData.villageId = res.data.data.village_id;
                getApp().globalData.userId = res.data.data.id;
                if (res.data.data.id != '') {
                  getApp().globalData.stas = 1;
                  setTimeout(() => {
                    wx.switchTab({
                      url: '../home/home',
                    })
                  }, 1000)
                    
                  wx.setStorage({
                    key: 'openid',
                    data: res.data.data.uuid
                  })
                  wx.setStorage({
                    key: 'session_key',
                    data: res.data.data.session_key
                  })
                }
              }
            wx.hideLoading()
            // 然后跳转主页面
            } else {
        }  
          }, 
          fail(res) {
            console.log("请求失败")
            wx.hideLoading()
            wx.showToast({
              title: res.data.message,
              // title: '登录错误',
              icon: 'none', // "success", "loading", "none"
              duration: 2000,
              mask: true
          })
          }
        })
      }
      
    }),

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
  
  globalData: {
    open_id: null,
    session_key: null,
    userInfo: null,
    openId: null,
    userInfo: null,
    affirm: 0,
    nickName: null,
    villageId: null,
    account: null,
    equipment_id : null,
    allList: '',
    staff_id:'',
    selectedParams: '',
    name: '',
    userId: '',
    value6: false,
    state_switch: false,
    state_num: '',
    checkLogin: false,
    sta : '',
    stas: '',
    // header:('':''),

    // 测试服务器地址
    rootUrl: "https://dev.zzdelectric.com/",
    // rootUrl: "http://114.115.221.203:8080/",
    // 测试图片地址
    imgUrl: "https://dev.zzdelectric.com",
    // rootUrl: "http://114.115.221.203:8080/",
    socketUrl: "https://socket.zzdelectric.com/",
    // socketUrl: "http://114.115.221.203:8888/",
    //仪表参数 首次进入
    getDataFromTsdb: "app/admin/getDataFromTsdb",
    //参数上部数据
    informationAbstracts:"app/equipment/informationAbstracts",
    //获取openid
    getOpenId: "app/staff/getOpenid",
    // 用户登录
    userLogin: "app/staff/login",
    // 全部设备
    equipmentList: "app/equipment/list",
    //报警设备
    overrunList: "app/equipment/indexList",
    //设备报警详情
    detail: "app/equipment/detail",
    //现场记录
    fixAdd: "/app/equipment/fix/add",
    //参数列表
    curveParamList: "/app/equipment/curveParamList",
    performanceCurve1 : "app/equipment/performanceCurve1",
    //添加参数
    curveAdd: "app/equipment/curve/add",
    //设备日志
    equipmentLog: "/app/equipment/log",
    //维修记录
    fixList: "app/equipment/fix/list",
    //维修记录次数
    staffFixNum: "/app/equipment/fix/staffFixNum",
    //设备详情
    equipmentDetail: "/app/equipment/detail",
    //获取设备key值
    getChannelKey: "/app/equipment/getChannelKey",
    //控制指令
    sendOrder: "/app/equipment/sendOrder",
    //维修详情
    fixDetail: "/app/equipment/fix/detail",
    //退出登录
    logOut: "/app/staff/logout",
    getAccessToken: "/app/overrun/getAccessToken",
    //指令 控制密码
    checkPassword: "/app/admin/checkPassword"
  }
})



