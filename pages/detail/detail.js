// pages/detail/detail.js
var WxParse = require('../../txcomponent/wxParse/wxParse.js');
var brandId = ''
var explain = '', condition = '', process = '', fee = ''
var _isShow1 = false, _isShow2 = false, _isShow3 = false, _isShow4 = false
Page({
  data: {
    infoLnbo: [],
    brandInfo: {},
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    likeList: [],
    showModal: false,
    userMobile: '',
    conheight1: '350rpx',
    conopen1: 'inline-block',
    conclose1: 'none',
    conheight2: '350rpx',
    conopen2: 'inline-block',
    conclose2: 'none',
    conheight3: '350rpx',
    conopen3: 'inline-block',
    conclose3: 'none',
    conheight4: '350rpx',
    conopen4: 'inline-block',
    conclose4: 'none'
  },
  onLoad: function (options) {
    brandId = options.bid
    var that = this
    wx.request({
      url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetBrandDetails',
      data: { brandId: brandId },
      success: function (res) {
        var imgsArr = res.data.brandInfo.Imgs.split(',')
        var brandImg = []
        for (var i = 0; i < imgsArr.length; i++) {
          brandImg.push(imgsArr[i])
        }
        wx.setNavigationBarTitle({ title: res.data.brandInfo.Name })
        /*
        WxParse.wxParse(bindName , type, data, target,imagePadding) 
        1.模板中bindName绑定的数据名(必填) 
        2.type可以为html或者md(必填) 
        3.data为传入的具体数据(必填) 
        4.target为Page对象,一般为this(必填) 
        5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选) 
        */
        WxParse.wxParse('explain', 'html', res.data.brandInfo.Explain, that, 5);
        WxParse.wxParse('condition', 'html', res.data.brandInfo.Condition, that, 5);
        WxParse.wxParse('process', 'html', res.data.brandInfo.Process, that, 5);
        WxParse.wxParse('fee', 'html', res.data.brandInfo.Fee, that, 5);
        that.setData({
          infoLnbo: brandImg,
          brandInfo: res.data.brandInfo,
          likeList: res.data.likeList
        })
      }
    })
  },
  //为一键返回首页，此处不使用navigator标签
  GoToDetail: function (e) {
    var bId = e.currentTarget.dataset.id
    wx.redirectTo({
      url: '../detail/detail?bid=' + bId,
    })
  },
  OpenOrClose1: function (e) {
    if (!_isShow1) {
      _isShow1 = true
      this.setData({
        conheight1: 'auto',
        conopen1: 'none',
        conclose1: 'inline-block'
      })
    } else {
      _isShow1 = false
      this.setData({
        conheight1: '350rpx',
        conopen1: 'inline-block',
        conclose1: 'none'
      })
    }
  },
  OpenOrClose2: function (e) {
    if (!_isShow2) {
      _isShow2 = true
      this.setData({
        conheight2: 'auto',
        conopen2: 'none',
        conclose2: 'inline-block'
      })
    } else {
      _isShow2 = false
      this.setData({
        conheight2: '350rpx',
        conopen2: 'inline-block',
        conclose2: 'none'
      })
    }
  },
  OpenOrClose3: function (e) {
    if (!_isShow3) {
      _isShow3 = true
      this.setData({
        conheight3: 'auto',
        conopen3: 'none',
        conclose3: 'inline-block'
      })
    } else {
      _isShow3 = false
      this.setData({
        conheight3: '350rpx',
        conopen3: 'inline-block',
        conclose3: 'none'
      })
    }
  },
  OpenOrClose4: function (e) {
    if (!_isShow4) {
      _isShow4 = true
      this.setData({
        conheight4: 'auto',
        conopen4: 'none',
        conclose4: 'inline-block'
      })
    } else {
      _isShow4 = false
      this.setData({
        conheight4: '350rpx',
        conopen4: 'inline-block',
        conclose4: 'none'
      })
    }
  },
  ShowTelModal: function () {
    this.setData({ showModal: true })
  },
  InputMobile: function (e) {
    this.setData({ userMobile: e.detail.value })
  },
  onCancel: function () {
    this.setData({ showModal: false });
  },
  onConfirm: function (e) {
    this.setData({ showModal: false });
    wx.request({
      url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/SubTelCallback',
      data: { mobile: this.data.userMobile, brandId: brandId },
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          success: function () {

          }
        })
      }
    })
  }
})