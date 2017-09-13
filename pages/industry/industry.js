var cId
var pageIndex = 1
var isLoad = true

Page({
  data: {
    industryList: [],
    hasMore: true,
    scrollHeight: 0
  },
  onLoad: function (options) {
    cId = options.cid
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    })
    wx.request({
      url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetBrandListByIndustry',
      data: { classId: cId, page: 1, size: 10 },
      success: function (res) {
        wx.setNavigationBarTitle({ title: res.data.ClassName })
        that.setData({
          industryList: res.data.industryList
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
        url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetBrandListByIndustry',
        data:
        { page: pageIndex, size: 10, classId: cId },
        success: function (res) {
          that.setData({
            industryList: that.data.industryList.concat(res.data.industryList),
          })
          isLoad = true
        }
      })
    }
  },
})