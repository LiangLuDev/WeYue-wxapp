//app.js
App({
  onLaunch: function () {
      // 打开调试
      wx.setEnableDebug({
          enableDebug: true
      })
  },
  globalData: {
    openid: 'openid',
    appid: 'wxcf431e81711984db',
    appsecret: '07a921c4ff08a0609411c25ed0c1fb08',
    user_info:'',
  }
})