/**
 * Created by zeven on 2017/7/5.
 */
import axios from 'axios';
import qs from 'qs';

export function token({username, password}) {
  let client_id = 'admin-cli';
  let grant_type = 'password';
  return axios.post('/auth/realms/user/protocol/openid-connect/token',
    qs.stringify({username, password, client_id, grant_type}))
}

export function refreshToken() {
  let client_id = 'admin-cli';
  let grant_type = 'refresh_token';
  let refresh_token = sessionStorage.getItem('refresh_token');
  return axios.post('/auth/realms/user/protocol/openid-connect/token', qs.stringify({
    client_id, grant_type, refresh_token
  }))
}

export function updateToken({data}) {
  sessionStorage.token = `Bearer ${data.access_token}`;
  sessionStorage.refresh_token = data.refresh_token;
  sessionStorage.expires_in = data.expires_in;
}