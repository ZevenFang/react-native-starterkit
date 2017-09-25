/**
 * Created by zeven on 2017/7/6.
 */
import axios from 'axios';
import qs from 'qs';

const defaultSize = 10;

function orders({pageSize=defaultSize, pageNumber,creationFromTime, creationToTime, status, orderType, inCome}) {
  return axios.get('/business-platform.web.services.individual/restindi/uc/orders?'+
    qs.stringify({pageSize, pageNumber, creationFromTime, creationToTime, status, type: orderType, inCome})
  );
}

function withdrawals({pageSize=defaultSize, pageNumber, creationFromTime, creationToTime, WithdrawalStatus}) {
  let params = {pageSize, pageNumber, creationFromTime, creationToTime, _: Date.now()};
  if (WithdrawalStatus) params.WithdrawalStatus = WithdrawalStatus;
  return axios.get('/business-platform.web.services.individual/restindi/uc/withdrawals?'+
    qs.stringify(params));
}

function charges({pageSize=defaultSize, pageNumber, creationFromTime, creationToTime}) {
  return axios.get('/business-platform.web.services.individual/restindi/uc/charges?'+
   qs.stringify({pageSize, pageNumber, creationFromTime, creationToTime}))
}

function balance({pageSize=defaultSize, pageNumber, creationFromTime, creationToTime, inCome, billsType}) {
  return axios.get('/business-platform.web.services.individual/restindi/uc/balanceDetails?'+
    qs.stringify({pageSize, pageNumber, creationFromTime, creationToTime, inCome, billsType}))
}

export const status = {
  '': '全部',
  'PENDING': '待支付',
  'TOBECONFIRM': '待确认',
  'PROCESSING': '进行中',
  'SUCCESS': '已成功',
  'OUT_DATED': '已失败',
  'INVALID': '已失败',
  'FAILD': '已失败',
  'REFUNDED': '已失败',
  'CLOSE': '已关闭'
};

export const type = {
  '': '全部',
  'INVOICE': '消费',
  'REFUND': '退款',
  'CHARGE': '充值',
  'WITHDRAW': '提现'
};
export const inCome = ['全部','收入','支出'];

export const WithdrawalStatus = {
  '': '全部',
  'PENDING': '提现中',
  'SUCCESS': '提现成功',
  'FAILD': '提现失败',
};

export const billsType = {
  '': '全部',
  'CGFK': '消费',
  'CGTK': '退款',
  'CHARGE': '充值',
  'WITHDRAW': '提现',
  'OTHER': '其它'
};
export const billsTypeItem = {
  'COMMISION':'消费',
  'BALANCE_PAYMENT_SUCCESS':'消费',
  'CHARGE_PAYMENT_SUCCESS':'充值',
  'CHARGE_PAYMENT_PATCH':'充值',
  'REFUNDBILL_BEFORE_SETTLEMENT':'退款',
  'REFUNDBILL_AFTER_SETTLEMENT':'退款',
  'REFUNDBILL_B_SETTLEMENT_REFUND':'退款',
  'REFUNDBILL_A_SETTLEMENT_REFUND':'退款',
  'REFUND_REVIEW_FALSE_AFTER_SPLIT_BEFORE_SETTLE':'退款',
  'REFUND_REVIEW_FALSE_AFTER_SETTLE':'退款',
  'BALANCE_REFUNDBILL_BEFORE_SETTLEMENT':'退款',
  'BALANCE_REFUNDBILL_AFTER_SETTLEMENT':'退款',
  'BALANCE_REFUND_SUCCESS':'退款',
  'BALANCE_REFUND_FAIL_PATCH_PROCESS':'退款',
  'REFUND_PAY_FALSE_PATCH_PROCESS_BALANCEPAY':'退款',
  'CHARGE_PAYMENT_RECONCILIATION':'退款',
  'WITHDRAW_APPLY':'提现',
  'WITHDRAW_SUCCESS':'提现',
  'WITHDRAW_PASS':'提现',
  'ADJUSTMENT_WRITE_OFF_CHARGE':'充值错账冲销',
  'WITHDRAW_REFUND':'提现失败',
  'WITHDRAW_FALSE':'提现失败'
};
export default {
  orders,
  withdrawals,
  charges,
  balance,
  status,
  type,
  inCome,
  WithdrawalStatus,
  billsType,
  billsTypeItem
};