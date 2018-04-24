let sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
let dev_request = require('../../utils/dev_request');
let mMajor
let mPage
let mType
let bookInfo
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
        isEmpty:false,
        empty_msg:'Pen友，别慌，此分类还没有添加书籍'
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
        mPage = 1
        mType = 'hot'
        mMajor = options.major;
        bookInfo = []
        wx.setNavigationBarTitle({
            title: mMajor
        });

    },

    onShow: function () {
        this.getBooks(1)
        bookInfo = []
    },


    tabClick: function (e) {
        bookInfo = []
        mPage = 1
        switch (e.currentTarget.id) {
            case '0':
                mType = 'hot'
                this.getBooks(mPage)
                break
            case '1':
                mType = 'new'
                this.getBooks(mPage)
                break
            case '2':
                mType = 'reputation'
                this.getBooks(mPage)
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
            book.data.forEach(function (item) {
                item.cover = dev_request.ZHUISHU_URL + item.cover
                bookInfo.push(item)
            })
            that.setData({
                books: bookInfo,
                isEmpty:bookInfo.length === 0
            })

        });

    },


    /**
     * 跳转书籍详情
     * @param params
     */
    startBooksDetail:function (params) {
        wx.navigateTo({
            url: '../detail/detail?book_name=' + params.currentTarget.dataset.book_name+"&bookid="+params.currentTarget.dataset.bookid,
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        ++mPage
        that.getBooks(mPage)


    },


})