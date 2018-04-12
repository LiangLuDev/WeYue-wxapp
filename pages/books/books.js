let sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
let dev_request = require('../../utils/dev_request');
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
        base_url: dev_request.BASE_URL,
        isLoadMore: false,
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
        dev_request.Get('/books', data, function (book) {
            setTimeout(function () {
                if (page > 1) {
                    if (book.data.length > 0) {
                        bookInfo.push(book.data)
                        console.log(bookInfo)
                    }
                } else {
                    bookInfo = []
                    bookInfo = book.data
                }

                that.setData({
                    books: bookInfo,
                    isLoadMore: false
                })
            }, 1000)

        });

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        this.setData({
            isLoadMore: true
        })

        ++mPage
        that.getBooks(mPage)


    },


})