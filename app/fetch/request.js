import {Alert} from 'react-native';
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  console.log(response.status);
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  try {
      const sendToken = await STORAGE.load({
          key: 'token'
      });
      if(sendToken){
          options.headers = {...options.headers, token: sendToken };
      }
  } catch (err){
    console.warn(err.message);
  }
  const response = await fetch(url, options);

  checkStatus(response);

  const  { data, code, message } = await response.json();
  let newData = null;
  if(code !== 0){
      Alert.alert(message);
  }else {
    newData = data;
  }
  const ret = {
    data: newData,
    code,
    headers: {},
  };
  const token = response.headers.get('token');
  console.log('token', token);
  if(token){
      STORAGE.save({
          key: 'token',  // 注意:请不要在key中使用_下划线符号!
          data: token,

          // 如果不指定过期时间，则会使用defaultExpires参数
          // 如果设为null，则永不过期
          expires: 1000*24*7*3600
      });
  }
  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }

  return ret;
}
