// pages/zhuce/zhuce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check_id_existence:'',
    register:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  formsubmit:function(e){
    var that=this
    wx.request({
      url: 'http://scut18pie1.top/test/gift/user/check_id_existence.php',
      method: 'POST',
      data: {
        id: e.detail.value.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          check_id_existence:res.data
        })
      }
    })
    if(this.data.check_id_existence==0){
      wx.request({
        url: 'http://scut18pie1.top/test/gift/user/register.php',
        method: 'POST',
        data: {
          id: e.detail.value.id,
          nickname: e.detail.value.nickname,
          password: e.detail.value.password,
          sex: e.detail.value.sex,
          address: e.detail.value.adress,
          phone: e.detail.value.phone
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            register: res.data
          })
        }
      })
    }
    else{
      wx.showToast({
        title: '您输入的账号已存在',
      })
      setTimeout(function(){
        wx.hideToast()
      },2000)
    }
    if (this.data.register == 1){
      wx.redirectTo({
        url: '/pages/home/home',
      })
    }
    else{
      wx.showToast({
        title: '我也不知道你为啥注册不了',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
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