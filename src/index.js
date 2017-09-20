import React from 'react';
import './config/ReactotronConfig';
import dva from 'dva/mobile'
import models from './models'
import App from './App';

const app = dva({
  onError (e) {
    console.warn(e)
  }
});
models.map(m=>app.model(m));
app.router(() => <App />);

export default app.start();