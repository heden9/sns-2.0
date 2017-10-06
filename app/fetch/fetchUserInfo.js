import request from './request';
import { HOST } from './config.json';

export async function getFollow() {
  return request(HOST+'/follow',{
      method: 'POST',
      mode: "cors",
      credentials: 'include',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
      },
  });
}


export async function getMessage() {
    return request(HOST+'/message',{
        method: 'POST',
        mode: "cors",
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
}