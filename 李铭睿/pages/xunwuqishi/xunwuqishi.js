// pages/xunwuqishi/xunwuqishi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  addpicture:function(){
    var that=this
    wx.chooseImage({
      success: function(res) {
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
      },
    })
  },

  formsubmit:function(e){
    var that=this
    wx.uploadFile({
      url: 'http://scut18pie1.top/test/gift/user/create_a_lost.php',
      filePath: that.data.tempFilePaths[0],
      name: 'picuture',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + wx.getStorageSync("sessionid")
      },
      formData:{
        'content':e.detail.value.content,
        'phone':e.detail.value.phone,
        'address':e.detail.value.address
      },
      success:function(res){
        if(res.data==0){
          console.log(res)
        }
        else{
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