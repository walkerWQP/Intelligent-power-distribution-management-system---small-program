const app = getApp();
const rootUrl = app.globalData.rootUrl;
const imgUrl = app.globalData.imgUrl;
const detail = app.globalData.detail;
const fixAdd = app.globalData.fixAdd;
const fixDetail = app.globalData.fixDetail;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    min: 0,
    max: 200,
    ids: '',
    equipmentImg:'',
    imgUrl: imgUrl,
    equipment_id:'',
    fix_img:'',
    fix_imgs:[],
    files: [],
    fix:'',
    fixid:'',
    state: 1,
    fix_detail: {},
    countIndex: 1,
    imgLength:'',
    equipmentImgs: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ids: options.id,
      show_name : options.show_name,
      equipment_id: options.equipment_id,
      fixid: options.fixid,
    });
    if (this.data.fixid){
      this.getdetail();
    }else{
      this.data.state == 2;
    }
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
      id: that.data.equipment_id,
    }

    wx.request({
      url: rootUrl + detail,
      method: "get",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          that.setData({
            equipmentImg: (JSON.parse(res.data.data.equipment_img)),
          });
          that.setData({
            equipmentImgs: (imgUrl + that.data.equipmentImg).split(","),
          })
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
   * 解决方式
   */
  inputs: function (e) {
    var value = e.detail.value;
    var that = this;
    that.data.fix = e.detail.value;
    var len = parseInt(value.length);
    if (len > this.data.max) return;
    this.setData({
      record: len,
      content: value,
    });
    if (that.data.content.length > 0) {
      this.setData({
        primaryBtn: true,
      })
    }
    else {
      this.setData({
        primaryBtn: false,
      })
    }
  },
  //保存
  enterButtonClick: function () {
    const that = this;
    const param = {
      fix_img: that.data.fix_imgs,
      equipment_id: that.data.equipment_id,
      fix: that.data.fix,
      staff_id: getApp().globalData.userId,
      fault_id: that.data.ids,
    }
      wx.request({
        url: rootUrl + fixAdd,
        method: "post",
        data: param,
        success(res) {
          // console.log(res);
          if (res.data.code == 0) {
            wx.showToast({
              title: '提交成功！',
              icon: 'none',
              duration: 1000
            })
            setTimeout(() => {
              wx.navigateBack({
              })
            }, 1500)
          }
        },
      })
    },

  chooseImage: function ({ sizeType = ['original','compressed'], sourceType = ['album', 'camera'], count = 1}) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      count : 1,
      success: function (res) {
        // console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        // console.log(that.data.files);
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            that.data.fix_img = 'data:image/png;base64,' + res.data;
            that.data.fix_imgs.push(that.data.fix_img);
            that.setData({
              imgLength: that.data.fix_imgs.length,
            })
          }
        })       
      }
    })
  },
  //现场照片放大
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  //报警照片放大
  previewImages: function (e) {
    // var that = this;
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.equipmentImgs // 需要预览的图片http链接列表
    })
  },

  
  deleteImage: function(e) {
    var that = this;    
    var images = that.data.files;    
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          that.data.fix_imgs.splice(index, 1);
        } else if (res.cancel) {
            return false;
        }
        that.setData({
          files: that.data.fix_imgs
        });
        that.setData({
          imgLength: that.data.fix_imgs.length,
        })
      }
    })
  }
    


  



  
})