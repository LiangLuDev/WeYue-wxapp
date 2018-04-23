let bookid
let dev_request = require('../../utils/dev_request');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookinfo: '',
        addText: '加入书架'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        bookid = options.bookid
        wx.setNavigationBarTitle({
            title: options.book_name
        });


        dev_request.Get('/books/' + bookid, function (bookdetail) {
            let data = bookdetail.data
            data.cover = dev_request.ZHUISHU_URL + bookdetail.data.cover
            let wordCount = data.wordCount + '字'
            if (data.wordCount / 10000 > 0) {
                wordCount = parseInt(data.wordCount / 10000) + '万字'
            }
            data.wordCount = wordCount
            data.rating.score = data.rating.score.toFixed(1)
            //书籍更新时间计算
            let updateTime = new Date(data.updated).getTime()
            let dateTime = new Date().getTime()
            let day = parseInt((dateTime - updateTime) / (1000 * 3600 * 24))
            let hour = parseInt((dateTime - updateTime) / (1000 * 3600 ))
            data.updated = day > 0 ? day + '天前' : hour + '小时前'
            let addText = data.isCollect ? '移除书架' : '加入书架'
            that.setData({
                bookinfo: bookdetail.data,
                addText: addText
            })
        })

    },

    /**
     * 添加书籍到书架
     */
    addBook: function () {
        let that=this
        let url = '/user/bookshelf'
        let data = {
            bookid: bookid,
        }
        if (this.data.addText === '加入书架') {
            dev_request.Post(url, data, function (addBookInfo) {
                wx.showToast({
                    title: addBookInfo.data,
                    icon: 'success',
                    duration: 1000
                })
                that.setData({
                    addText:'移除书架'
                })
            })

        } else if (this.data.addText === '移除书架') {
            dev_request.Delete(url, data, function (deleteBookInfo) {
                wx.showToast({
                    title: deleteBookInfo.data,
                    icon: 'success',
                    duration: 1000
                })
                that.setData({
                    addText:'加入书架'
                })
            })

        }
    },
    /**
     * 阅读书籍
     */
    readBook: function () {

    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})