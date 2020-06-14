/**
 * @format
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */

let headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    accesstoken: 'xxxxxxxxxxxxx', //
};

let origin = 'http://192.168.1.114:3000';

// 返回值是Promise泛型，resolve()的参数为any
function request(url: string, params: any, method: string = 'POST'): Promise<any> {
    const options =
        method === 'GET'
            ? {method}
            : {
                  method,
                  // headers: headers,
                  body: JSON.stringify(params),
              };
    return new Promise((resolve, reject) => {
        fetch(`${origin}${url}`, options)
            .then(response => response.json())
            .then(responseData => resolve(responseData))
            .catch(err => {
                console.log(url + '请求失败', err);
                reject(err);
            });
    });
}

export {request};
