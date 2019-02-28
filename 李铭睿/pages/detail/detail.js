// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eid:'',
    eventinfo:'',
    userinfo:'',
    comment:'',
    color:'black',
    hidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.setData({
      eid: options.eid,
      eventinfo: JSON.parse(options.eventinfo),
      userinfo: JSON.parse(options.userinfo)
    })
    wx.request({
      url: 'http://scut18pie1.top/test/gift/user/pull_chats.php',
      method: 'POST',
      data: {
        rid: that.data.eventinfo.rid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + wx.getStorageSync("sessionid")
      },
      success: function (res) {
        that.setData({
          comment: res.data
        })
      }
    })
    wx.request({
      url: 'http://scut18pie1.top/test/gift/user/check_good_existence.php',
      method: 'POST',
      data: {
        eid: that.data.eventinfo.eid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + wx.getStorageSync("sessionid")
      },
      success: function (res) {
        if(res.data===1){
          that.setData({
            color:'red'
          })
        }
        else{
          that.setData({
            color:'black'
          })
        }
      }
    })
  },

  commentshow:function(){
    this.setData({
      hidden: false
    })
  },

  tohome:function(){
    wx.redirectTo({
      url: '/pages/home/home',
    })
  },

  onShareAppMessage:function(){
    return{
      title:'',
      desc:'',
      path: '/pages/detail/detail?eventinfo=' + JSON.stringify(this.data.eventinfo) + '&eid=' + this.data.eid + '&userinfo=' + JSON.stringify(this.data.userinfo)
    }
  },

  goods:function(){
    var that=this
    wx.request({
      url: 'http://scut18pie1.top/test/gift/user/good.php',
      method: 'POST',
      data: {
        eid: that.data.eventinfo.eid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + wx.getStorageSync("sessionid")
      },
      success: function (res) {
        wx.request({
          url: 'http://scut18pie1.top/test/gift/user/check_good_existence.php',
          method: 'POST',
          data: {
            eid: that.data.eventinfo.eid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': 'PHPSESSID=' + wx.getStorageSync("sessionid")
          },
          success: function (res) {
            if (res.data === 1) {
              that.setData({
                color: 'red'
              })
            }
            else {
              that.setData({
                color: 'black'
              })
            }
          }
        })
      }
    })
  },

  back:function(){
    wx.redirectTo({
      url: '/pages/home/home'
    })
  },

  close:function(){
    this.setData({
      hidden: true
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