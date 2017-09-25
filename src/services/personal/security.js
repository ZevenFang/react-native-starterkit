import axios from 'axios';
import qs from 'qs';
import Validator from '../utils/Validator';

export const ways = {
  password: '修改登录密码',
  payment: '修改支付密码',
  email: '修改邮箱地址',
  secret: '修改密码保护',
  phone: '修改手机号码'
};

export const types = {
  PAT: '通过“支付密码”+“短信验证”',
  TAC: '通过“短信验证码”+“身份证”',
  TAQ: '通过“短信验证码”+“密保问题”',
  CAQ: '通过“密保问题”+“身份证”',
  PAQ: '通过“支付密码”+“密保问题”',
  PAC: '通过“支付密码”+“身份证”',
  MAT: '通过“原邮箱”+“短信验证”',
  MAP: '通过“原邮箱”+“支付密码”'
};

export const questions = [
  '你的小学叫什么名字？',
  '你最崇拜的人物是谁？',
  '你最喜欢的花名字叫什么？',
  '你父亲的姓名？',
  '你母亲的姓名？',
  '你的出生地是哪里？',
  '你父亲的职业是？',
  '你高中班主任的名字？'
];

export function sendCaptcha({phone, username}) {
  if (phone)
    return axios.post(`/business-platform.web.services.individual/restindi/uc/${phone}/sendCaptcha`);
  if (username)
    return axios.post(`/business-platform.web.services.individual/restindi/uc/${username}/sendCaptchaByName`);
  return axios.post('/business-platform.web.services.individual/restindi/uc/sendUserCaptcha');
}
export function sendEmail(type) {
  return axios.get('/business-platform.web.services.individual/restindi/uc/sendEmail?'+
    qs.stringify({type}));
}
export function validate(data) {
  data.registrationName = sessionStorage.username;
  return axios.post('/business-platform.web.services.individual/restindi/uc/validateClient', data)
}
export function validateUser(username) {
  return axios.get('/business-platform.web.services.individual/restindi/uc/validateUser?'+
    qs.stringify({name: username||sessionStorage.username})
  )
}
export function validateCaptcha(captcha, code) {
  if (!code)
    return axios.post(`/business-platform.web.services.individual/restindi/uc/${captcha}/validateUserCaptcha`);
  if (Validator.Mobile.test(captcha))
    return axios.post(`/business-platform.web.services.individual/restindi/uc/${captcha}/${code}/validateCaptcha`);
  else
    return axios.post(`/business-platform.web.services.individual/restindi/uc/${captcha}/${code}/validateCaptchaByName`);
}
// path: ${host}/personal/#/security/email/:type(MAT|MAP)/:email/:code
export function validateEmail({email, code}) {
  return axios.get('/business-platform.web.services.individual/restindi/uc/validateEmail?'+
    qs.stringify({email, code}))
}

export function modifyPassword({oldPassword, newPassword}) {
  return axios.post('/business-platform.web.services.individual/restindi/uc/modifyPassword',
    qs.stringify({oldPassword, newPassword}))
}
export function modifyPasswordNoLogin({params, code}) {
  return axios.post('/business-platform.web.services.individual/restindi/uc/modifyPasswordNoLogin/'+code,
    {...params})
}
export function modifyPayment({code, password}) {
  return axios.post('/business-platform.web.services.individual/restindi/uc/modifyPaymentPassword/'+code,
    {paymentPassword: password, registrationName: sessionStorage.username})
}
export function modifyPhone({code, phone}) {
  return axios.post('/business-platform.web.services.individual/restindi/uc/modifyPhone/'+code,
    {phone})
}
export function modifyEmail({code, email}) {
  return axios.post('/business-platform.web.services.individual/restindi/uc/modifyEmail/'+code,
    {email, registrationName: sessionStorage.username})
}
export function modifySecret({code, answer1, answer2, answer3, question1, question2, question3}) {
  return axios.post('/business-platform.web.services.individual/restindi/uc/modifyAnswers/'+code,
    {answer1, answer2, answer3, question1, question2, question3, registrationName: sessionStorage.username})
}

export function forgotPassword(params) {
  return axios.post('/business-platform.web.services.individual/restindi/uc/forgotPassword', params)
}