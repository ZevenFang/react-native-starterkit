import * as api from '../services/user'
import * as auth from '../services/auth';
import {routerRedux} from 'dva/router';
import {message} from 'antd';

export default {
  namespace: 'user',
  state: {
    amount: 0,
    userinfo: {}
  },
  reducers: {
    setAmount(state, {data}){
      state.amount = data.LIABILITY + data.WITHDRAWABLE;
      return {...state};
    },
    setUserInfo(state, {data}){
      sessionStorage.username = data.registrationName;
      state.userinfo = data;
      return {...state};
    },
    logout(state){
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('expires_in');
      state.userinfo = {};
      return {...state};
    },
    setToken(state, {token}){
      state.token = token;
      return {...state}
    }
  },
  effects: {
    *getAmount(action, {put, call}){
      let {data} = yield call(api.amount);
      yield put({type:'setAmount', data})
    },
    *getUserInfo(action, {put, call}){
      let {data} = yield call(api.userinfo);
      yield put({type:'setUserInfo', data})
    },
    *certification({idCard, legalName, longTerm, registrationName, sex, validDates}, {put, call}){
      let validFromDate = validDates[0]?validDates[0].format('YYYY-MM-DD'):'';
      let validToDate = validDates[1]?validDates[1].format('YYYY-MM-DD'):'';
      let {data} = yield call(api.certification, {idCard, legalName, longTerm, registrationName, sex, validFromDate, validToDate});
      if (data==='success') {
        message.success('实名认证成功');
        yield put(routerRedux.replace('/account'));
        yield put({type: 'getUserInfo'});
      }
      else message.error(data);
    },
    *login({username, password, remember}, {put, call}){
      try {
        let res = yield call(auth.token, {username, password});
        auth.updateToken(res);
        localStorage.remember = remember;
        if (remember) localStorage.username = username;
        else localStorage.removeItem('username');
        yield put({type: 'setToken', token: res.data.access_token});
        yield put({type: 'getUserInfo'});
        yield put({type: 'getAmount'});
        yield put({type: 'bank/getBanks'});
      } catch (e) {
        if(e.response && e.response.data['error_description'] === 'Account disabled')
          message.error('该用户已被禁用');
        else message.error('用户名或密码错误');
      }
    }
  }
}