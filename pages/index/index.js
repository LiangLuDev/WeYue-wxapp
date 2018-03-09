var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var contant = require('../constant.js');
var dev_request = require('../../utils/dev_request');
Page({
    data: {
        tabs: ["男生", "女生", "出版"],
        classifys: {},
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        base_url: contant.base_url
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });

        dev_request.Get('/classify', function (res) {
            that.setData({
                classifys: res.data
            })
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    startBooks: function (e) {
        wx.navigateTo({
            url: '../books/books?major=' + e.currentTarget.dataset.major,
        })
    }

})