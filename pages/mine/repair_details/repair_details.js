// pages/mine/repair_details/repair_details.js
const app = getApp();
const rootUrl = app.globalData.rootUrl;
const imgUrl = app.globalData.imgUrl;
const detail = app.globalData.detail;
const fixDetail = app.globalData.fixDetail;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    fix_img:'',
    imgUrl: imgUrl,
    equipment_id:'',
    show_name:'',
    files: [],
    fix_imgs: [],
    equipmentImgs : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      equipment_id: options.equipment_id,
      show_name: options.show_name
    });
    // console.log(this.data.id);
    this.getdetail();
    this.alertDetail();
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
  //现场记录详情
  getdetail() {
    const that = this;
    const param = {
      id: that.data.id,
    }
    // console.log(param);
    wx.request({
      url: rootUrl + fixDetail,
      method: "get",
      data: param,
      success(res) {
        // console.log(res);
        if (res.data.code == 0) {
          that.setData({
            fix_detail: res.data.data,
            fix_img: (JSON.parse(res.data.data.fix_img)),
          })
          that.data.fix_detail = res.data.data;
          // console.log((imgUrl + that.data.fix_img).split(","));
          that.setData({
            fix_imgs: (imgUrl + that.data.fix_img).split(","),
          })
          // console.log(that.data.fix_imgs);
        }
      },
    })
  },
  //报警详情
  alertDetail(){
    var that = this;
    const param = {
      id: that.data.equipment_id,
    }
    // console.log(param);

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
          // console.log(that.data.equipmentImg);
          that.setData({
            equipmentImgs: (imgUrl + that.data.equipmentImg).split(","),
          })
          // console.log(that.data.equipmentImgs);
        }
      },
    });
  },
  //现场照片放大
  previewImage: function (e) {
    // var that = this;
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.fix_imgs // 需要预览的图片http链接列表
    })
  },
   //设计图纸放大
  previewImages: function (e) {
    // var that = this;
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.equipmentImgs // 需要预览的图片http链接列表
    })
  },
})