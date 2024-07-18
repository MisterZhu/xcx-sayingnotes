/// <reference path="./types/index.d.ts" />

// types/index.d.ts

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    system?: {
      statusBarHeight: number,
      navbarHeight: number,
    },
    capsule?: {
      top: number,
      height: number
    }
  },
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
