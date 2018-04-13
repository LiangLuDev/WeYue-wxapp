// pages/register/register.js
let dev_request = require('../../utils/dev_request');
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    formRegister: function (e) {
        let username = e.detail.value.username;
        let password = e.detail.value.password;
        let confirm_password = e.detail.value.confirm_password;
        if (username.length === 0 || password.length === 0 || confirm_password.length === 0) {
            wx.showToast({
                title: '用户名或密码不得为空!',
                icon: 'none',
                duration: 1000
            })
        } else if (password !== confirm_password) {
            wx.showToast({
                title: '两次输入密码不一致!',
                icon: 'none',
                duration: 1000
            })
        } else {
            let data = {
                name: username,
                password: password
            }

            dev_request.Post('/user/register', data, function (res) {
                wx.showToast({
                    title: res.data,
                    icon: 'success',
                    duration: 1000
                })
                wx.navigateBack()//登录成功返回上一页
            })
        }
    }
})