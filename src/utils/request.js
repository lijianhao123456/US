import axios from 'axios';
// import store from '../index';

axios.defaults.baseURL = 'https://api-usv2.ncuos.com';
axios.defaults.timeout = 30000;
axios.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers.authorization = "Bearer " + token //请求头加上token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    })