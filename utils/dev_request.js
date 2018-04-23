// const BASE_URL = 'http://127.0.0.1:3389';
// const BASE_URL = 'http://192.168.5.87:3389';
const BASE_URL = 'http://120.55.57.236';
const ZHUISHU_URL = 'http://statics.zhuishushenqi.com';
const app = getApp();

/**
 * 网络请求封装
 * @param url url路径名 例：/books
 * @param method 请求方式 POST/GET/DELETE等
 * @param data 请求参数 string类型
 * @param success  成功回调
 * @param fail 失败回调
 */
function request(url, method, data, success, fail) {
    if (!fail && !success && typeof data === 'function') {
        // fail = null;
        success = data;
        data = "";
    } else if (!fail) {
        if (typeof data === 'function') {
            fail = success
            success = data
            data = ""
        } else if (typeof data === 'object') {
            // fail = null
        } else {
            console.log("传递参数类型不正确");
        }

    } else {
        console.log("传递参数个数不正确");
    }
    let wxtask = wx.request({
        url: BASE_URL + '/api' + url,
        header: {
            'access-token': app.globalData.user_info.token,
            'app-type': 'wx-app'
        },
        method: method,
        data: data,
        success: function (res) {
            switch (res.data.code) {
                case 10000:
                case 10001:
                case 10002:
                case 10004:
                    success(res.data)
                    break
                case 10005:
                case 40000:
                case 40001:
                case 40003:
                case 40004:
                case 40005:
                case 50000:
                case 50003:
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1000
                    })
                    if (fail) {
                        fail(res.data.msg)
                    }
                    break
                case 60001:
                case 60002:
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1000
                    })
                    //token无效跳转登录页面
                    wx.navigateTo({
                        url: "../login/login"
                    })

                    break
            }
        },
        fail: function (res) {
            console.log(res);
            wx.showToast({
                title: res,
                icon: 'none',
                duration: 1000
            })
            if (fail) {
                fail(res)
            }
        }
    })


    return wxtask;
}


/**
 * 请求封装-Get
 * @param url 请求地址
 * @param data 请求参数
 * @param success 成功回调
 * @param fail  失败回调
 * @constructor
 *
 * 返回值为微信请求实例   用于取消请求
 */
function Get(url, data, success, fail) {
    return request(url, "GET", data, success, fail)
}


/**
 * 请求封装-Post
 * @param url 请求地址
 * @param data 请求参数
 * @param success 成功回调
 * @param fail  失败回调
 * @constructor
 *
 * 返回值为微信请求实例   用于取消请求
 */
function Post(url, data, success, fail) {
    return request(url, 'POST', data, success, fail)
}


/**
 * 请求封装-Delete
 * @param url 请求地址
 * @param data 请求参数
 * @param success 成功回调
 * @param fail  失败回调
 * @constructor
 *
 * 返回值为微信请求实例   用于取消请求
 */
function Delete(url, data, success, fail) {
    return request(url, 'DELETE', data, success, fail)
}

exports.Get = Get;
exports.Post = Post;
exports.Delete = Delete;
exports.BASE_URL = BASE_URL;
exports.ZHUISHU_URL = ZHUISHU_URL;