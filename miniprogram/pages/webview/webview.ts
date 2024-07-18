Page({
  data: {
    webUrl: ''
  },

  onLoad(options: { url?: string }) {
    this.setData({
      webUrl: options.url || ''
    });
  }
});
