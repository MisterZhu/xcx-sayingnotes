// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util'
const App = getApp<IAppOption>();

Component({
  data: {
    logs: [],
  },
  lifetimes: {
    attached() {
      const navbarHeight = App.globalData?.system?.navbarHeight || 0;
      console.log('log navbarHeight:', navbarHeight);

      this.setData({
        navbarHeight,
        logs: (wx.getStorageSync('logs') || []).map((log: string) => {
          return {
            date: formatTime(new Date(log)),
            timeStamp: log
          }
        }),
      })
    }
  },
})
