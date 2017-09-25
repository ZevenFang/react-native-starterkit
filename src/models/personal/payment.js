import * as api from '../services/payment'
import qs from 'qs';
import config from '../config';
import swal from 'sweetalert';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'payment',
  state: {
    chargeUrl: ''
  },
  reducers: {
    setCharge(state, {data}){
      let str = data.split('|');
      let query = {merchantId: str[2], outTradeNo: str[1]};
      state.chargeUrl = `${config.host}/business-platform.payment-channel.web/hqpay/gateway/pc?${qs.stringify(query)}`;
      return {...state};
    }
  },
  effects: {
    *charge({unitPrice}, {put, call}){
      let {data} = yield call(api.charge, {unitPrice});
      yield put({type: 'setCharge', data});
    },
    *withdraw({amount,bankAccount,bankAccountName,password,transferInBankId}, {call, put}){
      let {data} = yield call(api.withdrawal, {amount, bankAccount, bankAccountName, password, transferInBankId});
      if (data){
        swal('提现申请成功', '请耐心等待工作人员审核（提现金额：'+amount+'元）', 'success');
        yield put(routerRedux.push('/trade/withdraw'));
        yield put({type: 'user/getAmount'});
      }
    }
  }
}