var appInstance = getApp()
var brandId
Page({
  data: {
    brandInfo: {},
    //submitHidden: true
  },
  onLoad: function (options) {
    brandId = options.bid
    var that = this
    wx.request({
      url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/GetBrandInfoById',
      data: { brandId: brandId },
      success: function (res) {
        wx.setNavigationBarTitle({ title: res.data.BrandName })
        that.setData({
          brandInfo: res.data
        })
      }
    })


    //初始化表单验证
    this.WxValidate = appInstance.wxValidate(
      {
        user_name: {
          required: true,
          minlength: 2,
          maxlength: 10,
        },
        user_mobile: {
          required: true,
          tel: true,
        },
        user_ly: {
          required: true,
          minlength: 2,
          maxlength: 100,
        }
      }
      , {
        user_name: {
          required: '姓名必填！',
        },
        user_mobile: {
          required: '手机号必填！',
          tel: '手机号码格式错误！',
        },
        user_ly: {
          required: '留言必填！',
        }
      }
    )
  },
  SubForm: function (e) {//表单提交
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg}`,
        icon: 'loading',
        duration: 1000
      })
      return false
    }
    //this.setData({ submitHidden: false })
    //验证成功提交
    var that = this
    var name = e.detail.value.user_name
    var mobile = e.detail.value.user_mobile
    var ly = e.detail.value.user_ly
    wx.request({
      url: 'https://api.txooo.com/api/txmain/miniapps/txooomain/SubLyForm',
      data: {
        userName: name,
        userMobile: mobile,
        userLy: ly,
        brandId: brandId
      },
      success: function (res) {
        //that.setData({ submitHidden: true })
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          success: function () {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  }
})