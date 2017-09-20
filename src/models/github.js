import * as api from '../services/github'

export default {
  namespace: 'github',
  state: {
    list: []
  },
  reducers: {
    setRepos(state, {list}) {
      state.list = list;
      return {...state};
    }
  },
  effects: {
    *getRepos({query}, {put, call}) {
      let {data} = yield call(api.searchRepositories, query);
      yield put({type: 'setRepos', list: data.items});
    }
  }
}