import request from './request';
import { HOST } from './config.json';

export async function getFollow() {
  return request(HOST+'/api/follow',{
      method: 'POST',
      mode: "cors",
      credentials: 'include',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      },
  });
}

export async function login(data) {
    return request(HOST+'/api/login',{
        method: 'POST',
        login: 1,
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
}

export async function getMessage() {
    return request(HOST+'/api/message',{
        method: 'POST',
        mode: "cors",
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
}