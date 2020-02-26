 
/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */

let headers = {
    "Content-Type": "application/json;charset=UTF-8",
    "accesstoken": 'xxxxxxxxxxxxx'  //
};

let origin = 'http://localhost:3000';

interface IResponse<T> {
    code: T
}


function request<T>(url: string, params: T, method: string='POST'): Promise<IResponse<number>> {
    return new Promise((resolve, reject) => {
        fetch(`${origin}${url}`, {
            method,
            // headers: headers,
            body: JSON.stringify(params)
        }).then(response => response.json()).then(responseData => resolve(responseData)).catch(err => {
            console.log(url + '请求失败', err);
            reject(err);
        })
    })
}

export {request};