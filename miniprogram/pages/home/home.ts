import { formatTime } from "../../utils/util";
const App = getApp<IAppOption>();

// pages/home/home.ts
Page({
  onNavBarIconTap() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // });
    wx.navigateTo({
      url: '/pages/webview/webview?url=https://h5.tigerbot.com/'
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    topIconDistance: 34 as number, // 初始化距离值
    showScrollView: false, // 控制滚动视图显示隐藏
    logs: [],
    show: false,
    buttons: [
        {
            type: 'default',
            className: '',
            text: '辅助操作',
            value: 0
        },
        {
            type: 'primary',
            className: '',
            text: '主操作',
            value: 1
        }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    const statusBarHeight = systemInfo.statusBarHeight || 0;
    console.log('SafeAreaInsetTop:', statusBarHeight);

    // 获取胶囊按钮的信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const navBarHeight = menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight) * 2;
    console.log(menuButtonInfo);

    // 存储安全区顶部高度
    // wx.setStorageSync('SafeAreaInsetTop', menuButtonInfo.top);
    console.log('SafeAreaInsetTop1:', menuButtonInfo.top);

    // 计算顶部图标距离
    const topIconDistance = statusBarHeight + navBarHeight;

    // 打印顶部图标距离
    console.log('顶部图标距离:', topIconDistance);
    const navbar = App.globalData?.system?.navbarHeight || 0;

    // 设置 topIconDistance 到 data 中
    this.setData({
      navbar,
      topIconDistance: topIconDistance
    });
  },
 /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '分享标题',
      path: '/pages/home/home'
    };
  },
  onButtonTap() {

    // 隐藏背景图并显示滚动视图
    this.setData({
      showScrollView: true,
      show: true,
      logs: (wx.getStorageSync('logs') || []).map((log: string) => {
        return {
          date: formatTime(new Date(log)),
          timeStamp: log
        }
      }),
    });
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 可添加相关逻辑
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 可添加相关逻辑
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 可添加相关逻辑
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 可添加相关逻辑
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 可添加相关逻辑
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 可添加相关逻辑
  },

 
});
