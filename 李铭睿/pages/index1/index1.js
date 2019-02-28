// pages/index1/index1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
    login:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  zhuce1:function(){
    wx.navigateTo({
      url: '/pages/zhuce/zhuce',
    })
  },

  login1:function(){
    this.setData({
      hidden:true
    })
  },

  closewindow: function () {
    this.setData({
      hidden: false
    })
  },

  formsubmit:function(e){
    var that = this
    if (!(/^\w+$/.test(e.detail.value.id))) {
      wx.showToast({

        title: '帐号使用英文数字下划线',

        duration: 2000,

        icon: 'none'

      })
    }
    else{
      wx.request({
        url: 'http://scut18pie1.top/test/gift/user/login.php',
        method: 'POST',
        data: {
          id: e.detail.value.id,
          password: e.detail.value.password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success: function (res) {
          wx.setStorageSync("sessionid", res.cookies[1].value)
          that.setData({
            login: res.data,
          })
          if (that.data.login == 1) {
            wx.redirectTo({
              url: '/pages/home/home',
            })
          }
          else {
            wx.showToast({
              title: '账号密码错误',
            })
            setTimeout(function () {
              wx.hideToast()
            }, 2000)
          }
        }
      })
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