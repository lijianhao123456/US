import { isUrl } from '../utils/utils';
import config from '../config';

const { admin, normal, office, ncuhomer } = config.auth;

const menuData = [
  {
    name: '家园圈子',
    icon: 'home',
    path: 'community',
    authority: [admin, office, normal, ncuhomer],
  },
  {
    name: '通讯录',
    icon: 'form',
    path: 'address',
    authority: [admin, office, normal, ncuhomer],
  },
  {
    name: '黑匣子',
    icon: 'user',
    path: 'darkhut',
    authority: [admin, office, normal, ncuhomer],
    children: [
      {
        name: '签到',
        path: 'sign_in',
      },
      {
        name: '工作量填写',
        path: 'workload',
      },
      {
        name: '组内互评',
        path: 'assessment',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
      {
        name: '每月之星',
        path: 'month_star',
      },
      {
        name: '投票',
        path: 'vote',
      },
      {
        name: '无课统计',
        path: 'time_table',
      },
      {
        name: '反馈与建议',
        path: 'feedback',
      },
      // {
      //   name: '芝麻开门',
      //   path: 'open_door',
      // },
    ],
  },
  {
    name: '行政',
    icon: 'dashboard',
    path: admin,
    authority: [admin, office],
    children: [
      /* {
        name: '卫生统计',
        path: 'cleaning',
      }, */
      // {
      //   name: '考核统计',
      //   path: 'assessment',
      // },
      {
        name: '行政导表',
        path: 'excel_export',
      },
      {
        name: '投票创建',
        path: 'vote',
      },
      {
        name: '工作量审核',
        path: 'workload',
      },
      {
        name: '人员管理',
        path: 'personnel',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
