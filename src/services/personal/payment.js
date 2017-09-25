/**
 * Created by zeven on 2017/7/6.
 */
import axios from 'axios';
import qs from 'qs';

export function withdrawal({amount,bankAccount,bankAccountName,password,transferInBankId}) {
  return axios.post('/business-platform.web.services.individual/restindi/uc/withdrawal',
    {amount,bankAccount,bankAccountName,password,transferInBankId})
}

// "/business-platform.payment-channel.web/hqpay/gateway/pc?merchantId="+merchantId+"&outTradeNo="+str[1]+"&sign=forTest&returnUrl=https://"+location.host+"/business-platform-personal/success.html"
export function charge({unitPrice}) {
  let businessType = "CHARGE";
  let chargeOperator = sessionStorage.username;
  let offer = {description: '预付款', product: {id:1}, quantity: '1', unitPrice};
  let receiver = {'@type':'customer'};
  return axios.post('/business-platform.web.services.individual/restindi/uc/charge',
    {businessType,chargeOperator,offers:[offer],receiver}, {
      headers: {'Content-Type': 'application/json'}
    })
}

export function payStatus(tradeNo) {
  return axios.get(`/business-platform.payment-channel.web/hqpay/gateway/invoicePayedStatus?${qs.stringify({tradeNo})}`);
}