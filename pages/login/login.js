// pages/login/login.js

let dev_request = require('../../utils/dev_request');
const app = getApp()

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
    //登录提交按钮
    formLogin: function (e) {
        console.log(e);
        let username = e.detail.value.username;
        let password = e.detail.value.password;
        if (username.length === 0 || password.length === 0) {
            wx.showToast({
                title: '用户名或密码不得为空!',
                icon: 'none',
                duration: 1000
            })
        } else {
            let data = {
                name: username,
                password: password
            }
            dev_request.Get('/user/login', data, function (res) {
                app.globalData.user_info=res.data
                wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 1000
                })
                wx.navigateBack()//登录成功返回上一页
            })
        }
    }

    ,bindtapRegister:function () {
        wx.navigateTo({
            url:'../register/register'
        })
    }

})