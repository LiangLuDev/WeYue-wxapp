let dev_request = require('../../utils/dev_request');
let isCollect = false;
let bookid;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isOpenChapter: false,//是否打开目录弹框
        isCollect: false,//是否收藏
        chapters: '',//目录
        chapter: '',//正文
        currentChapter: 0,//当前目录下标
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        bookid = options.bookid
        isCollect = options.isCollect

        wx.setNavigationBarTitle({
            title: options.bookTitle
        });

        dev_request.Get('/books/' + bookid + '/chapters', function (bookChapters) {


            wx.getStorage({
                key: bookid,
                success: res => {
                    that.getChapter(bookChapters.data.chapters[res.data.chapterIndex].link)
                    that.setData({
                        currentChapter: res.data.chapterIndex
                    })
                }, fail: err => {
                    console.log(err);
                    that.getChapter(bookChapters.data.chapters[0].link)
                }
            });


            that.setData({
                chapters: bookChapters.data.chapters
            })
        })


    },

    /**
     * 获取正文
     * @param link
     */
    getChapter: function (link) {
        let that = this
        wx.request({
            url: 'http://chapterup.zhuishushenqi.com/chapter/' + link,
            success: bookChapter => {
                that.setData({
                    chapter: bookChapter.data.chapter,
                })
            }
        })
    },
    /**
     * 打开目录弹框
     */
    showChapter: function () {
        this.setData({
            isOpenChapter: true
        })
    },
    /**
     * 关闭目录弹框
     */
    hideChapter: function () {
        this.setData({
            isOpenChapter: false
        })
    },
    /**
     * 上一章数据获取
     * @param params
     */
    preChapter: function (params) {
        let currentIndex = params.currentTarget.dataset.current_index
        currentIndex--
        let chapter = this.data.chapters[currentIndex]
        this.getChapter(chapter.link)
        this.setData({
            currentChapter: currentIndex,
            chapter: ""
        })

    },
    /**
     * 下一章数据获取
     * @param params
     */
    nextChapter: function (params) {
        let currentIndex = params.currentTarget.dataset.current_index
        currentIndex++
        let chapter = this.data.chapters[currentIndex]
        this.getChapter(chapter.link)
        this.setData({
            currentChapter: currentIndex,
            chapter: ""
        })

    },

    selectChapter: function (params) {
        let index = params.currentTarget.dataset.index
        if (this.data.currentChapter !== index) {
            let chapter = this.data.chapters[index]
            this.getChapter(chapter.link)
            this.setData({
                currentChapter: index,
                isOpenChapter: false,
                chapter: ""
            })

        }
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        let data = {
            bookid: bookid,
            chapterIndex: this.data.currentChapter,
        }
        wx.setStorage({
            key: bookid,
            data: data
        })


    },

})