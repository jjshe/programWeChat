var pageIndex = 1
var isLoad = true

Page({
  data: {
    hasMore: true,
    scrollHeight: 0,
    discoverList: []
  },
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    })
    wx.request({
      url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetBrandList',
      data: { page: 1, size: 10 },
      success: function (res) {
        wx.setNavigationBarTitle({ title: '发现' })
        that.setData({
          discoverList: res.data.data
        })
      }
    })
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
        data:
        { page: pageIndex, size: 10 },
        success: function (res) {
          that.setData({
            discoverList: that.data.discoverList.concat(res.data.data),
          })
          isLoad = true
        }
      })
    }
  },
})