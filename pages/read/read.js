let dev_request = require('../../utils/dev_request');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isOpenChapter: false,
        isCollect:false,
        chapters:'',
        chapter:'',
        currentChapter:0,
        isChapterScroll:true,//正文是否可滑动
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this
        let bookid = options.bookid

        wx.setNavigationBarTitle({
            title: options.bookTitle
        });

        dev_request.Get('/books/' + bookid + '/chapters', function (bookChapters) {
            console.log(bookChapters);
            that.getChapter(bookChapters.data.chapters[0].link)
            that.setData({
                chapters:bookChapters.data.chapters
            })
        })



        let isCollect = options.isCollect
        this.setData({
            isCollect:isCollect === 'true'
        })

    },

    /**
     * 获取正文
     * @param link
     */
    getChapter:function (link) {
        let that=this
        wx.request({
            url:'http://chapterup.zhuishushenqi.com/chapter/'+link,
            success:bookChapter=>{
                console.log(bookChapter);
                that.setData({
                    chapter:bookChapter.data.chapter
                })


                if (wx.pageScrollTo) {
                    wx.pageScrollTo({
                        scrollTop: 0
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                    })
                }
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
    preChapter:function (params) {
        let currentIndex=params.currentTarget.dataset.current_index
        currentIndex--
        let chapter=this.data.chapters[currentIndex]
        this.getChapter(chapter.link)
        this.setData({
            currentChapter:currentIndex
        })

    },
    /**
     * 下一章数据获取
     * @param params
     */
    nextChapter:function (params) {
        let currentIndex=params.currentTarget.dataset.current_index
        currentIndex++
        let chapter=this.data.chapters[currentIndex]
        this.getChapter(chapter.link)
        this.setData({
            currentChapter:currentIndex
        })

    },
    upper:function (e) {
        console.log(e);
        this.setData({
            isChapterScroll:false
        })
    },
    lower:function (e) {
        console.log(e);
        this.setData({
            isChapterScroll:false
        })
    }

})