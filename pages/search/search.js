var searchKeyword

Page({
  data: {
    //公共
    defaultValue: '',  //搜索输入框的值
    //默认页
    tuijianList: [],  //推荐列表
    isdefualtshow: 'none',  //控制页面标签是否显示
  },
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ scrollHeight: res.windowHeight });
      }
    })
    wx.request({
      url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetRecommendList',
      success: function (res) {
        that.setData({ tuijianList: res.data.RecommendList, isdefualtshow: 'block' })
      }
    })
  },
  GetIndustyByTag: function (e) {//点击标签进行搜索
    var tagid = e.currentTarget.dataset.tagid
    var tagname = e.currentTarget.dataset.tagname
    var pid = e.currentTarget.dataset.pid
    wx.navigateTo({
      url: '../searchresult/searchresult?type=1&tagid=' + tagid + '&tagname=' + tagname + '&pid=' + pid,
    })
  },
  InputKeyword: function (e) {//点击搜索键进行搜索
    searchKeyword = e.detail.value
  },
  SearchByKeyword: function (e) {
    if (searchKeyword == undefined || searchKeyword == 'undefined' || searchKeyword == '') {
      wx.showToast({
        title: '请输入搜索词！',
      })
      return
    } else {
      wx.navigateTo({
        url: '../searchresult/searchresult?type=2&keyword=' + searchKeyword
      })
    }
  }
})