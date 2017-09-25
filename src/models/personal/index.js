import user from './user';
import bank from './bank';
import trade from './trade';
import payment from './payment';
import security from './security';

const app = {
  namespace: 'app',
  state: {},
  subscriptions: {
    setup({ history }) {
    },
  }
};

export default [app, user, bank, trade, payment, security];