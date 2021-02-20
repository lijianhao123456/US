import { message } from 'antd';
import axios from 'axios';

axios.defaults.baseURL = 'https://api-usv2.ncuos.com';
axios.defaults.timeout = 30000;
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        // if (token) {
        //     config.headers.authorization = token //请求头加上token
        // }
        config.headers.authorization = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNjI3LCJyZW1lbWJlcl9tZSI6dHJ1ZSwiZXhwIjoyMjE3OTI3MjQ4fQ.4X0NsqCtqZEFPO6vSARBjQbBWRN5mWtq_SmOLHjBBxo"
        return config
    },
    err => {
        return Promise.reject(err)
    })
export default async function request(url, data = {}, type = 'GET') {
    let res
    try {
        if (type === 'GET') {//发送get请求
            res = await axios.get(url, {
                params: data
            })
        } else if (type === 'POST') {//发送POST请求
            res = await axios.post(url, data);
        } else if (type === 'PUT') {
            res = await axios.put(url, data)
        } else if (type === 'DELETE') {
            res = await axios.delete(url, {
                params: data
            })
        }
    } catch (error) {
        console.log(error);
    }
    return res
}
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        message.error(error.response.data.message)
        return Promise.resolve(error.response);
    }
)