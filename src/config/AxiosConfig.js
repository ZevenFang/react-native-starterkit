import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.host;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
