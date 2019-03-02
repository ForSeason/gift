// pages/selfcenter/selfcenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headPic:'',
    nickname:'',
    tempFilePaths:'',
    concent: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'http://scut18pie1.top/test/gift/user/get_my_info.php',
      method: 'POST',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + wx.getStorageSync("sessionid")
      },
      success: function (res) {
        that.setData({
          headPic:res.data.info.headPic,
          nickname:res.data.info.nickname
        })
      }
    })
  },

  bindinput: function (e) {
    this.setData({
      concent: e.detail.value,
    })
  },

  changehead:function(){
    var that = this
    wx.chooseImage({
      success: function (res) {
        wx.uploadFile({
          url: 'http://scut18pie1.top/test/gift/user/update_headPic.php',
          filePath: res.tempFilePaths[0],
          name: 'headPic',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=' + wx.getStorageSync("sessionid")
          },
          success: function (res) {
          }
        })
      },
    })
  },

  formsubmit: function (e) {
    var that = this
    wx.request({
      url: 'http://scut18pie1.top/test/gift/user/update_my_info.php',
      method: 'POST',
      data: {
        'params[0]': 'nickname',
        'params[1]': 'phone',
        'params[2]': 'address',
        'params[3]': 'selfIntro',
        'values[0]': e.detail.value.nickname,
        'values[1]': e.detail.value.phone,
        'values[2]': e.detail.value.address,
        'values[3]': that.data.concent
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + wx.getStorageSync("sessionid")
      },
      success: function (res) {
        if (res.data == 0) {
          console.log(res)
        }
        else {
          wx.redirectTo({
            url: '/pages/home/home',
          })
        }
      }
    })
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