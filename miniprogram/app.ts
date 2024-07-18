// app.ts

App<IAppOption>({
  globalData: {
    userInfo: undefined,
    system: undefined,
    capsule: undefined
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
    const systemInfo = wx.getSystemInfoSync();
    const capsule = wx.getMenuButtonBoundingClientRect();
    // const statusBarHeight = systemInfo.statusBarHeight || 0;
    // const navBarHeight = capsule.height + (capsule.top - statusBarHeight) * 2;
    // console.log(capsule);
    // const navBarHeight = capsule.height + (capsule.top - statusBarHeight) * 2;
    console.log('navBarHeight:', capsule.bottom);

    this.globalData = {
      system: {
        statusBarHeight: systemInfo.statusBarHeight,
        navbarHeight:capsule.bottom,
      },
      capsule: {
        top: capsule.top,
        height: capsule.height
      }
    };
  },
});