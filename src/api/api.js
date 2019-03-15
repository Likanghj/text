import axios from 'axios';

let base = 'http://192.168.45.162:9999';

 
export const getProjectDetail = params => { return axios.get(`${base}/projectdb/project/detail`, { params: params }); };

export const getProjectListPage = params => { return axios.get(`${base}/projectdb/project/list`, { params: params }); };

export const getProjecCountByStat = params => { return axios.get(`${base}/projectdb/project/counts`, { params: params }); };

  