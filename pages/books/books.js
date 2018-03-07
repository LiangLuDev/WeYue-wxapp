let sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
let contant = require('../constant.js');
let netapi = require('../../utils/netapi');
let mMajor = ''
let mPage = 1
let mType = 'hot';
let bookInfo = [];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: ['热门', '新书', '好评'],
        books: [],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        base_url: contant.base_url,
        isLoadMore: false,
        loadStatus: '上拉加载'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
        mMajor = options.major;
        wx.setNavigationBarTitle({
            title: mMajor
        });
        this.getBooks(1)
    },


    tabClick: function (e) {
        switch (e.currentTarget.id) {
            case '0':
                mType = 'hot'
                this.getBooks(1)
                break
            case '1':
                mType = 'new'
                this.getBooks(1)
                break
            case '2':
                mType = 'reputation'
                this.getBooks(1)
                break
        }

        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },

    /**
     * 获取书籍列表信息
     */
    getBooks: function (page) {
        let that = this;
        let data = {

            type: mType,
            major: mMajor,
            page: page

        };
        netapi.Get('/books', data, function (res) {
            console.log('success', res);
            let loadStatus = '数据加载完毕';
            let isLoadMore = false;

            console.log(book.data);
            if (page > 1) {
                if (book.data.data.length > 0) {
                    bookInfo.push(book.data.data)
                    console.log(bookInfo)
                } else {
                    loadStatus = '暂无更多书籍数据'
                }

            } else {
                bookInfo = []
                bookInfo = book.data.data
            }

            that.setData({
                books: bookInfo,
                loadStatus: loadStatus,
                isLoadMore: isLoadMore
            })
        }, function (err) {
            console.log('err', err);
            that.setData({
                loadStatus: '数据加载错误',
                isLoadMore: false
            })
        });


        // wx.request({
        //     url: contant.base_url + '/books',
        //     data: {
        //         type: mType,
        //         major: mMajor,
        //         page: page
        //     },
        //     method: 'GET',
        //     success: function (book) {
        //         let loadStatus = '数据加载完毕'
        //         let isLoadMore = false
        //
        //         console.log(book.data);
        //         if (page > 1) {
        //             if (book.data.data.length > 0) {
        //                 bookInfo.push(book.data.data)
        //                 console.log(bookInfo)
        //             } else {
        //                 loadStatus = '暂无更多书籍数据'
        //             }
        //
        //         } else {
        //             bookInfo = []
        //             bookInfo = book.data.data
        //         }
        //
        //         that.setData({
        //             books: bookInfo,
        //             loadStatus: loadStatus,
        //             isLoadMore: isLoadMore
        //         })
        //     }, fail() {
        //         that.setData({
        //             loadStatus: '数据加载错误',
        //             isLoadMore: false
        //         })
        //     }
        //
        // })
    },


    // loadMore:function(){
    //   this.setData({
    //     loadStatus: '上拉加载数据',
    //     isLoadMore: true
    //   })
    //   ++mPage
    //   this.getBooks(mPage)
    // },


    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        this.setData({
            loadStatus: '正在加载数据',
            isLoadMore: true
        })

        setTimeout(function () {
            ++mPage
            that.getBooks(mPage)
        }, 2000)

    },


})