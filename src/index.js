import React from 'react';
import './config/AxiosConfig';
// import './config/MomentConfig';
import './config/ReactotronConfig';
import createLoading from './utils/dva-loading';
import dva from 'dva/mobile'
import models from './models'
import App from './App';

const app = dva({
  onError (e) {
    console.warn(e)
  }
});
app.use(createLoading());
models.map(m=>app.model(m));
app.router(() => <App />);

export default app.start();