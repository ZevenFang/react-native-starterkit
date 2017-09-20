import axios from 'axios';
import qs from 'qs';
import {githubApi} from '../config';

export function searchRepositories(query) {
  return axios.get(githubApi+'/search/repositories?'+
    qs.stringify({q: query, sort: 'stars'}));
}