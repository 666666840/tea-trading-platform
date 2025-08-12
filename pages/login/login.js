const { Auth } = require('../../utils/auth-manager.js');
Page({
  data: {
    username: '',
    password: '',
    loading: false,
    errorMsg: ''
  },

  onUsernameInput(e) {
    this.setData({ username: e.detail.value })
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value })
  },

  async onLoginTap() {
    const { username, password } = this.data;
    if (!username || !password) {
      this.setData({ errorMsg: '请输入账号和密码' });
      return;
    }
    this.setData({ loading: true, errorMsg: '' });
    try {
      const result = await Auth.loginWithPassword(username, password);
      if (result.success) {
        // 设置全局登录状态
        const app = getApp();
        app.globalData.currentUser = {
          isLoggedIn: true,
          userInfo: result.userInfo
        };
        wx.showToast({ title: '登录成功', icon: 'success' });
        setTimeout(() => {
          wx.reLaunch({ url: '/pages/profile/profile' });
        }, 500);
      } else {
        this.setData({ errorMsg: result.message || '账号或密码错误' });
      }
    } catch (e) {
      this.setData({ errorMsg: '登录失败，请重试' });
    }
    this.setData({ loading: false });
  }
}); 