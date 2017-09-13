var pageIndex = 1
var isLoad = true

var tagClassId, tagTagId
var searchKeyword


Page({
  data: {
    //公共
    loadMore: '',  //加载更多的方法，单独页面单独绑定
    defaultValue: '',  //搜索输入框的值
    scrollHeight: 0,

    //点击标签跳转页
    tagList: [],  //标签列表
    istagshow: 'none',  //控制标签列表是否显示
    hasMore: true,  //标签列表是否还有内容

    //搜索页
    keywordList: [],  //搜索列表
    iskeywordshow: 'none',  //控制是否显示搜索列表
    iskeywordnoneshow: 'none',  //控制搜索无结果是否显示
    tuijianList: [],  //推荐列表
  },
  onLoad: function (options) {
    pageIndex = 1
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ scrollHeight: res.windowHeight });
      }
    })
    var searchType = options.type
    if (searchType == 1) {//点击标签后的搜索页
      tagClassId = options.pid
      tagTagId = options.tagid
      searchKeyword = options.tagname
      wx.setNavigationBarTitle({ title: searchKeyword })
      that.setData({ defaultValue: options.tagname, loadMore: 'TagLoadMore', istagshow: 'block' })
      wx.request({
        url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetIndustryByTagId',
        data: { page: pageIndex, size: 10, classId: tagClassId, tagId: tagTagId },
        success: function (res) {
          that.setData({ tagList: res.data.searchList })
        }
      })
    } else {//点击搜索框后的搜索页
      searchKeyword = options.keyword
      wx.setNavigationBarTitle({ title: searchKeyword })
      that.setData({ defaultValue: searchKeyword })
      wx.request({
        url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetListByKeyword',
        data: { page: pageIndex, size: 10, keyword: searchKeyword },
        success: function (res) {
          if (res.data.keywordList.length == 0) {//搜索无结果
            wx.request({
              url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetRecommendList',
              success: function (res) {
                that.setData({ tuijianList: res.data.RecommendList, isdefualtshow: 'block' })
                that.setData({ iskeywordnoneshow: 'block' })
              }
            })
          } else {
            that.setData({ keywordList: res.data.keywordList, iskeywordshow: 'block' })
            if (res.data.keywordList.length == 10) {
              that.setData({ loadMore: 'KeywordLoadMore' })
            }else{  
              that.setData({ hasMore: false })
            }
          }
        }
      })
    }
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
  },
  TagLoadMore: function () {//标签加载更多
    var that = this
    if (isLoad) {
      isLoad = false
      pageIndex++
      wx.request({
        url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetIndustryByTagId',
        data: { page: pageIndex, size: 10, classId: tagClassId, tagId: tagTagId },
        success: function (res) {
          that.setData({ tagList: that.data.tagList.concat(res.data.searchList), })
          if (res.data.searchList.length == 0) {
            that.setData({ hasMore: false })
          }
          isLoad = true
        }
      })
    }
  },
  KeywordLoadMore: function () {
    var that = this
    if (isLoad) {
      isLoad = false
      pageIndex++
      wx.request({
        url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetListByKeyword',
        data: { page: pageIndex, size: 10, keyword: searchKeyword },
        success: function (res) {
          that.setData({ keywordList: that.data.keywordList.concat(res.data.keywordList), })
          if (res.data.keywordList.length == 0) {
            that.setData({ hasMore: false })
          }
          isLoad = true
        }
      })
    }
  }
})