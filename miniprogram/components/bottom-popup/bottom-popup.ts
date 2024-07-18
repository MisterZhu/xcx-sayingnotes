Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },
  data: {
    formattedTime: '00:00',
    recording: false,
    interval: 0 as number | null,
    startTime: 0,
    tempFilePath: '',
  },
  methods: {
    hidePopup() {
      this.setData({
        show: false,
        recording: false,
        formattedTime: '00:00',
        startTime: 0,
        tempFilePath: '',
      });
      if (this.data.interval !== null) {
        clearInterval(this.data.interval);
        this.data.interval = null;
      }
    },
    startRecording() {
      if (this.data.recording) return;

      this.setData({
        recording: true,
        startTime: 0,
      });

      // 开始微信录音
      const recorderManager = wx.getRecorderManager();
      recorderManager.start({
        duration: 180000, // 3分钟
        format: 'mp3',
      });

      recorderManager.onStop((res) => {
        console.log('录音停止', res);
        this.setData({
          tempFilePath: res.tempFilePath,
        });
        this.hidePopup();
      });

      recorderManager.onError((err) => {
        console.error('录音错误', err);
        this.hidePopup();
      });

      // 计时器
      this.data.interval = setInterval(() => {
        if (!this.data.recording) {
          if (this.data.interval !== null) {
            clearInterval(this.data.interval);
            this.data.interval = null;
          }
          return;
        }

        this.data.startTime += 1;
        const minutes = Math.floor(this.data.startTime / 60);
        const seconds = this.data.startTime % 60;

        if (this.data.startTime >= 180) { // 超过3分钟
          recorderManager.stop();
        }

        this.setData({
          formattedTime: `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`,
        });
      }, 1000);
    },
    pauseRecording() {
      if (!this.data.recording) return;

      const recorderManager = wx.getRecorderManager();
      recorderManager.stop();

      recorderManager.onStop((res) => {
        console.log('录音暂停', res);
        this.setData({
          tempFilePath: res.tempFilePath,
          recording: false,
        });

        // 播放录制的音频
        const innerAudioContext = wx.createInnerAudioContext();
        innerAudioContext.src = res.tempFilePath;
        innerAudioContext.play();
      });

      if (this.data.interval !== null) {
        clearInterval(this.data.interval);
        this.data.interval = null;
      }
    },
  },
});
