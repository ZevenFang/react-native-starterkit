/**
 * Created by zeven on 2017/7/6.
 */
import axios from 'axios';

// 获取银行卡列表
export function banks() {
  return axios.get('/business-platform.web.services.individual/restindi/externalAccountReference');
}

// 获取银行机构
export function banksList() {
  return axios.get('/business-platform.web.services.individual/restindi/uc/banks?organizationType=BANK&withdrawable=1');
}

// 绑定银行卡
export function bind({id, phone, accountNo}) {
  return axios.post('/business-platform.web.services.individual/restindi/externalAccountReference/create',
    {bank: {id}, phone, accountNo})
}

export function unbind(id) {
  return axios.delete('/business-platform.web.services.individual/restindi/externalAccountReference/'+id)
}