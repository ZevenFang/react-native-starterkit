import * as api from '../services/bank'
import {message} from 'antd';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'bank',
  state: {
    list: [],
    banksList: []
  },
  reducers: {
    setBanks(state, {data}){
      state.list = data.page;
      return {...state};
    },
    setBanksList(state, {data}){
      state.banksList = data.page;
      return {...state};
    },
    unbindSync(state, {id}){
      state.list = state.list.filter(v=>v.id!==id);
      return {...state};
    }
  },
  effects: {
    *getBanks(action, {put, call}) {
      let {data} = yield call(api.banks);
      yield put({type: 'setBanks', data})
    },
    *getBanksList(action, {put, call}) {
      let {data} = yield call(api.banksList);
      yield put({type: 'setBanksList', data})
    },
    *unbind({id}, {put, call}) {
      let {data} = yield call(api.unbind, id);
      if (data==='success') {
        message.success('解除绑定成功');
        yield put({type: 'unbindSync', id});
      } else message.error('解除绑定失败');
    },
    *bind({id, phone, accountNo}, {put, call}) {
      let {data} = yield call(api.bind, {id, phone, accountNo});
      if (data==='success') {
        message.success('绑定银行卡成功');
        yield put(routerRedux.push('/account'));
        yield put({type: 'getBanks'});
      } else message.error('绑定银行卡失败');
    }
  }
}