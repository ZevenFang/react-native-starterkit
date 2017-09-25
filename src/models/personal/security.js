import * as api from '../services/security'
import {message} from 'antd';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'security',
  state: {
    user: {},
    loading: false
  },
  reducers: {
    setUser(state, {data}){
      state.user = data;
      return {...state}
    },
    setHasRegister(state,{hasRegister}){
      state.hasRegister = hasRegister;
      return {...state}
    },
    loading(state, {loading}){
      state.loading = loading;
      return {...state}
    }
  },
  effects: {
    *sendCaptcha({phone, username}, {put, call}){
      let {data} = yield call(api.sendCaptcha, {phone, username});
      if (data==='OK') {
        message.success('短信发送成功，请注意查收');
        yield put({type: 'setHasRegister', hasRegister:false});
        yield put({type: 'setHasRegister', hasRegister:true});
      } else message.error(data);
    },
    *sendEmail({wayType}, {put, call}){
      let {data} = yield call(api.sendEmail, wayType);
      if (data==='success') message.success('邮件发送成功，请注意查收');
      else message.error(data);
    },
    *validate({params, next}, {put, call}){
      let {captcha} = params;
      if (captcha) {
        let {data} = yield call(api.validateCaptcha, captcha);
        if (data === 'OK'){
          delete params.captcha;
          let {data} = yield call(api.validate, params);
          let code = data.split('_')[1];
          if (code) {
            sessionStorage.code = code;
            yield put(routerRedux.push(next));
          } else message.error(data);
        }else{
          message.error(data.split(':')[1]);
        }
      }else{
        delete params.captcha;
        let {data} = yield call(api.validate, params);
        let code = data.split('_')[1];
        if (code) {
          sessionStorage.code = code;
          yield put(routerRedux.push(next));
        } else message.error(data);
      }
    },
    *validateUser({username}, {put, call}){
      let {data} = yield call(api.validateUser, username);
      if (data)
        yield put({type: 'setUser', data});
      else if(username) message.warn('用户名不存在');
      if (username && data)
        yield put(routerRedux.push('/forgot/'+username));
    },
    *validateEmail({email, code}, {put, call}){
      yield put({type: 'loading', loading: true});
      try {
        yield call(api.validateEmail, {email, code});
      } catch (err) {
        message.error(err.response && err.response.data);
        yield put(routerRedux.replace('/account'));
      }
      yield put({type: 'loading', loading: false});
    },
    *modifyPassword({code, oldPassword, newPassword}, {put, call}){
      yield call(api.modifyPassword, {code, oldPassword, newPassword});
      message.success('修改登录密码成功');
      sessionStorage.removeItem('code');
      yield put(routerRedux.replace('/account'));
    },
    *modifyPasswordNoLogin({params, code}, {put, call}){
      let {data} = yield call(api.modifyPasswordNoLogin, {params, code});
      if (data){
        message.success('重置登录密码成功');
        yield put(routerRedux.replace('/'));
      } else {
        message.error('重置登录密码失败，请重试重置');
        yield put(routerRedux.replace('/forgot/'+params.registrationName));
      }
    },
    *modifyPayment({code, password}, {put, call}){
      yield call(api.modifyPayment, {code, password});
      message.success('修改支付密码成功');
      sessionStorage.removeItem('code');
      yield put(routerRedux.replace('/account'));
    },
    *modifyPhone({code, phone}, {put, call}){
      yield call(api.modifyPhone, {code, phone});
      message.success('修改手机号码成功');
      sessionStorage.removeItem('code');
      yield put({type: 'user/getUserInfo'});
      yield put(routerRedux.replace('/account'));
    },
    *modifyEmail({code, email}, {put, call}){
      yield call(api.modifyEmail, {code, email});
      message.success('修改邮箱地址成功');
      sessionStorage.removeItem('code');
      yield put({type: 'user/getUserInfo'});
      yield put(routerRedux.replace('/account'));
    },
    *modifySecret({code, answer1, answer2, answer3, question1, question2, question3}, {put, call}){
      yield call(api.modifySecret, {code, answer1, answer2, answer3, question1, question2, question3});
      message.success('修改密码保护成功');
      sessionStorage.removeItem('code');
      yield put(routerRedux.replace('/account'));
    },
    *forgotPassword({params}, {put, call}){
      let {captcha} = params;
      delete params.captcha;
      let {data} = yield call(api.forgotPassword, params);
      if (data.split('_')[0]==='success') {
        sessionStorage.code = data.split('_')[1];
        if (captcha) {
          let {data} = yield call(api.validateCaptcha, params.registrationName, captcha);
          if (data !== 'OK'){
            message.error(data.split(':')[1]);
            return;
          }
        }
        yield put(routerRedux.push(`/forgot/${params.registrationName}/next`));
      }
    }
  }
}