//index.js
//获取应用实例
var app = getApp()
var pageIndex = 1
var isLoad = true

Page({
  data: {
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    hasMore: true,
    scrollHeight: 0,
    brandList: [],
    lunboList: []
  },
  //页面加载调用
  onLoad: function () {
    wx.setNavigationBarTitle({ title: '天下商机' })
    var that = this
    wx.request({
      url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetIndexLunbo?page=1&size=6',
      success: function (res) { that.setData({ lunboList: res.data.data }) }
    })
    wx.request({
      url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetBrandList?page=1&size=10&order=lycount',
      success: function (res) { that.setData({ brandList: res.data.data }) }
    })

    wx.getSystemInfo({
      success: function (res) {
        that.setData({ scrollHeight: res.windowHeight });
      }
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({ userInfo: userInfo })
    })
  },
  //分享
  onShareAppMessage: function (res) {
    return {
      title: '天下商机',
      path: '/pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '转发成功！',
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  //加载更多
  loadMore: function (e) {
    var that = this
    if (!this.data.hasMore) return
    if (isLoad) {
      isLoad = false
      pageIndex++
      wx.request({
        url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetBrandList',
        data: { page: pageIndex, size: 10, order: 'lycount' },
        success: function (res) {
          that.setData({ brandList: that.data.brandList.concat(res.data.data), })
          isLoad = true
        }
      })
    }
  },
})
