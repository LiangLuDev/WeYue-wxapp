// pages/login/login.js

let netapi = require('../../utils/netapi');
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
        }else {
            let data={name:username,password:password}
            netapi.Get('/user/login',data,function (res) {
                console.log('login',res);
            },function (err) {
                console.log(err);
            })
        }
    }

})