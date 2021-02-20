import CommunityIndex from "../container/CommunityIndex.js"
import Login from "../container/Login/Login.jsx"

const routes = [
    {
        path: '/user/login',
        component: Login,
        requiresAuth: false,
    },
    {
        path: '/community',
        component: CommunityIndex,
        requiresAuth: true, //需要登陆后才能跳转的页面
    },
]
export default routes