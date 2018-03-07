const BASE_URL = 'http://192.168.5.251:3389/api';
const app = getApp();

/**
 * 请求封装-Get
 * @param url 请求地址
 * @param data 请求参数（无参数不用写）
 * @param success 成功回调
 * @param fail  失败回调
 * @constructor
 */
function Get(url, data, success, fail) {
    if (!fail) {
        fail = success;
        success = data;
        data = "";
    }

    wx.request({
        url: BASE_URL + url,
        header: {
            'access-token': app.globalData.access_token,
            'app-type': 'wx-app'
        },
        method: 'GET',
        data: data,
        success: function (res) {
            success(res)
        },
        fail: function (res) {
            fail(res)
        }
    })
}

exports.Get = Get;