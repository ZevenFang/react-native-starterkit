/**
 * Created by zeven on 2017/7/5.
 */
import axios from 'axios';
import qs from 'qs';

export function amount() {
  return axios.get('/business-platform.web.services.individual/restindi/uc/accounts')
}

export function userinfo() {
  return axios.get('/business-platform.web.services.individual/restindi/uc/single');
}

export function username(name) {
  return axios.get(`/business-platform.web.services.individual/restindi/uc/registrationName?${qs.stringify({name})}`)
}

export function register({phone, email, registrationName, password, paymentPassword, answer1, answer2, answer3, question1, question2, question3}) {
  return axios.post('/business-platform.web.services.individual/restindi/uc/simple',
    {phone, email, registrationName, password, paymentPassword, answer1, answer2, answer3, question1, question2, question3});
}

export function isExists(registrationName) {
  return axios.get('/business-platform.web.services.individual/restindi/uc/isExists?'+qs.stringify({registrationName}))
}

export function checkCertify(registrationName) {
  return axios.post('/business-platform.web.services.individual/restindi/uc/validateCertification',
    {registrationName})
}

export function certification({idCard, legalName, longTerm, registrationName, sex, validFromDate, validToDate}) {
  return axios.post('/business-platform.web.services.individual/restindi/uc/certification',
    {idCard, legalName, longTerm, registrationName, sex, validFromDate, validToDate});
}