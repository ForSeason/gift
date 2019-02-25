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
    var that=this
    wx.request({
      url: 'http://scut18pie1.top/test/gift/user/click.php',
      method: 'POST',
      data: {
        eid: that.data.eid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + wx.getStorageSync("sessionid")
      },
      success: function (res) {
        if(res.data==1){
          wx.navigateTo({
            url: '/pages/detail/detail?eventinfo=' + JSON.stringify(that.data.eventinfo) + '&eid=' + that.data.eid + '&userinfo=' + JSON.stringify(that.data.userinfo)})
        }
        else{
          console.log(res.data)
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

  }

  /**
   * 页面上拉触底事件的处理函数
   */
})