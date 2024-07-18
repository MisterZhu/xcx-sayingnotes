// 获取应用实例
const appInstance = getApp<IAppOption>();

Component({
  properties: {
    title: {
      type: String,
      value: '语录笔记'
    },
    background: {
      type: String,
      value: 'linear-gradient(to right,#FF3413,#FF924D)'
    },
    isSowArrow: {
      type: Boolean,
      value: true
    }
  },
  data: {
    capsuleTop: 0, // 胶囊距离屏幕顶部的距离
    capsuleHeight: 0, // 胶囊高度
    navbarHeight: 0 // 导航栏高度
  },
  lifetimes: {
    attached() {
      const { capsule, system } = appInstance.globalData;
      if (capsule && system) {
        this.setData({
          capsuleTop: capsule.top,
          capsuleHeight: capsule.height,
          navbarHeight: (capsule.top - system.statusBarHeight) * 2 + capsule.height + system.statusBarHeight,
        });
      } else {
        console.error('Global data not initialized properly.');
      }
    }
  },
  methods: {
    handleGoToBack() {
      wx.navigateBack({
        delta: 1
      });
    }
  }
});
