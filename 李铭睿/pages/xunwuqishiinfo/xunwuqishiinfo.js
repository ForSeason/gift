// pages/xunwuqishiinfo/xunwuqishiinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eid: '',
    eventinfo: '',
    userinfo: '',
    start: 0,
    step: 1,
    type: 2,
    disabled:true
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
        start: that.data.start,
        step: that.data.step,
        type: that.data.type
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
                  userinfo: res.data,
                  'eventinfo.createTime': getApp().toDate(that.data.eventinfo.createTime)
                })
                console.log(that.data.userinfo)
              }
            })
          }
        })
      }
    })
  },

  gotodetail: function () {
    var that = this
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
        if (res.data == 1) {
          wx.redirectTo({
            url: '/pages/detail/detail?eventinfo=' + JSON.stringify(that.data.eventinfo) + '&eid=' + that.data.eid + '&userinfo=' + JSON.stringify(that.data.userinfo)
          })
        }
        else {
          console.log(res.data)
        }
      }
    })
  },

  pre: function () {
    var that = this
    this.setData({
      start: that.data.start - 1
    })
    wx.request({
      url: 'http://scut18pie1.top/test/gift/user/get_event_list.php',
      method: 'POST',
      data: {
        start: that.data.start,
        step: that.data.step,
        type: that.data.type
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
                  userinfo: res.data,
                  'eventinfo.createTime': getApp().toDate(that.data.eventinfo.createTime)
                })
                if (that.data.start === 0) {
                  that.setData({
                    disabled: true
                  })
                }
              }
            })
          }
        })
      }
    })
  },

  next: function () {
    var that = this
    this.setData({
      start: that.data.start + 1
    })
    wx.request({
      url: 'http://scut18pie1.top/test/gift/user/get_event_list.php',
      method: 'POST',
      data: {
        start: that.data.start,
        step: that.data.step,
        type: that.data.type
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.length == 0) {
          wx.showToast({

            title: '没有更多了',

            duration: 2000,

            icon: 'none'

          })
          that.pre()
        }
        else {
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
                    userinfo: res.data,
                    'eventinfo.createTime': getApp().toDate(that.data.eventinfo.createTime),
                    disabled: false
                  })
                }
              })
            }
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
    var that = this
    this.setData({
      start: that.data.start + 1
    })
    wx.request({
      url: 'http://scut18pie1.top/test/gift/user/get_event_list.php',
      method: 'POST',
      data: {
        start: that.data.start,
        step: that.data.step,
        type: that.data.type
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
                  userinfo: res.data,
                  'eventinfo.createTime': getApp().toDate(that.data.eventinfo.createTime)
                })
              }
            })
          }
        })
      }
    })
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
    return {
      title: '',
      desc: '',
      path: '/pages/detail/detail?eventinfo=' + JSON.stringify(this.data.eventinfo) + '&eid=' + this.data.eid + '&userinfo=' + JSON.stringify(this.data.userinfo)
    }
  }
})