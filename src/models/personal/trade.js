import api from '../services/trade'

export default {
  namespace: 'trade',
  state: {
    list: {
      income: [],
      withdraw: [],
      charge: [],
      balance: []
    },
    recent: [],
    total: 0,
    loading: false
  },
  reducers: {
    setRecentOrders(state, {data}){
      state.recent = data.page;
      return {...state}
    },
    setList(state, {data, key}){
      state.list[key] = data.page;
      state.total = data.totalNumberOfResults;
      return {...state}
    },
    loading(state){
      state.loading = true;
      return {...state};
    },
    loaded(state){
      state.loading = false;
      return {...state};
    }
  },
  effects: {
    *getRecentOrders(action, {put, call}){
      yield put({type: 'loading'});
      let {data} = yield call(api.orders, {pageSize: 7});
      yield put({type: 'setRecentOrders', data});
      yield put({type: 'loaded'});
    },
    *getOrders(action, {put, call}){
      yield put({type: 'loading'});
      let {data} = yield call(api.orders, action);
      yield put({type: 'setList', data, key: 'income'});
      yield put({type: 'loaded'});
    },
    *getWithdrawals(action, {put, call}){
      yield put({type: 'loading'});
      let {data} = yield call(api.withdrawals, action);
      yield put({type: 'setList', data, key: 'withdraw'});
      yield put({type: 'loaded'});
    },
    *getCharges(action, {put, call}){
      yield put({type: 'loading'});
      let {data} = yield call(api.charges, action);
      yield put({type: 'setList', data, key: 'charge'});
      yield put({type: 'loaded'});
    },
    *getBalance(action, {put, call}){
      yield put({type: 'loading'});
      let {data} = yield call(api.balance, action);
      yield put({type: 'setList', data, key: 'balance'});
      yield put({type: 'loaded'});
    }
  }
}