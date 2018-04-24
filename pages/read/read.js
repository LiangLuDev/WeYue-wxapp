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
        currentChapter:'1'
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
                chapters:bookChapters
            })
        })



        let isCollect = options.isCollect
        console.log(isCollect);
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
    }

})