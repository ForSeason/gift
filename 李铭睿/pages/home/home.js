// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eid:'',
    eventinfo:'',
    userinfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://scut18pie1.top/test/gift/user/get_event_list.php',
      method: 'POST',
      data: {
        start:0,
        step:1,
        type:2
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          eid: res.data
        })
        wx.request({
          url: 'http://scut18pie1.top/test/gift/user/get_event_info.php',
          method: 'POST',
          data: {
            eid: that.data.eid[0]
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            that.setData({
              eventinfo: res.data
            })
            wx.request({
              url: 'http://scut18pie1.top/test/gift/user/get_user_info.php',
              method: 'POST',
              data: {
                id: that.data.eventinfo.id
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                that.setData({
                  userinfo: res.data
                })
              }
            })
          }
        })
      }
    })
    
  },

  formsubmit:function(e){
    var that = this
    wx.request({
      url: 'http://scut18pie1.top/test/gift/user/search_event.php',
      method: 'POST',
      data: {
        content: e.detail.value.content
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          eid: res.data
        })
        wx.request({
          url: 'http://scut18pie1.top/test/gift/user/get_event_info.php',
          method: 'POST',
          data: {
            eid: that.data.eid[0]
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            that.setData({
              eventinfo: res.data
            })
            wx.request({
              url: 'http://scut18pie1.top/test/gift/user/get_user_info.php',
              method: 'POST',
              data: {
                id: that.data.eventinfo.id
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                that.setData({
                  userinfo: res.data
                })
                console.log(that.data.userinfo)
              }
            })
          }
        })
      }
    })
  },

  fabuinfo:function(){
    wx.navigateTo({
      url: '/pages/fabuinfo/fabuinfo',
    })
  },

  selfcenter:function(){
    wx.navigateTo({
      url: '/pages/selfcenter/selfcenter',
    })
  },

  xunwuqishi:function(){
    wx.navigateTo({
      url: '/pages/xunwuqishiinfo/xunwuqishiinfo',
    })
  },

  shiwuzhaoling:function(){
    wx.navigateTo({
      url: '/pages/shiwuzhaolinginfo/shiwuzhaolinginfo',
    })
  },

  gotodetail:function(){
    wx.navigateTo({
      url: '/pages/detail/detail?eventinfo=' + JSON.stringify(this.data.eventinfo) + '&eid=' + this.data.eid + '&userinfo=' + JSON.stringify(this.data.userinfo),
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