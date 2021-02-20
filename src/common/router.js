import React, { createElement } from 'react';
import { Spin } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Loadable from 'react-loadable';
import { getMenuData } from './menu';
import config from '../config';

const { admin, office, normal } = config.auth;
let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // register models
  models.forEach(model => {
    if (modelNotExisted(app, model)) {
      // eslint-disable-next-line
      app.model(require(`../models/${model}`).default);
    }
  });

  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return Loadable({
    loader: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
    loading: () => {
      return <Spin size="large" className="global-spin" />;
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login', 'global'], () =>
        import('../layouts/BasicLayout')
      ),
    },
    '/community': {
      component: dynamicWrapper(app, ['community', 'monthstar'], () =>
        import('../routes/Community/_layout')
      ),
    },
    '/community/post': {
      component: dynamicWrapper(app, ['community', 'user'], () =>
        import('../routes/Community/TopicPost')
      ),
    },
    '/community/index': {
      component: dynamicWrapper(app, ['community', 'monthstar'], () =>
        import('../routes/Community/index')
      ),
    },
    '/community/index/:type': {
      component: dynamicWrapper(app, ['community'], () => import('../routes/Community/TopicList')),
    },
    '/community/edit': {
      component: dynamicWrapper(app, ['community'], () => import('../routes/Community/TopicPost')),
    },
    '/community/reply': {
      component: dynamicWrapper(app, ['community', 'user'], () =>
        import('../routes/Community/TopicReply')
      ),
    },
    '/community/topic': {
      component: dynamicWrapper(app, ['community'], () => import('../routes/Community/Topic')),
    },
    '/personal': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/Personal/index')),
    },
    '/address': {
      component: dynamicWrapper(app, ['address'], () => import('../routes/Address/index')),
    },
    '/darkhut/sign_in': {
      component: dynamicWrapper(app, ['signIn'], () => import('../routes/Darkhut/SignIn/_layout')),
    },
    '/darkhut/sign_in/meeting': {
      component: dynamicWrapper(app, ['signIn'], () => import('../routes/Darkhut/SignIn/SignIn')),
    },
    '/darkhut/sign_in/train': {
      component: dynamicWrapper(app, ['signIn'], () => import('../routes/Darkhut/SignIn/SignIn')),
    },
    '/darkhut/workload': {
      component: dynamicWrapper(app, ['workload'], () => import('../routes/Darkhut/Workload')),
    },
    '/darkhut/assessment': {
      component: dynamicWrapper(app, ['assessment'], () => import('../routes/Darkhut/Assessment')),
    },
    '/darkhut/month_star': {
      component: dynamicWrapper(app, ['monthstar'], () => import('../routes/Darkhut/MonthStar')),
    },
    '/darkhut/vote': {
      component: dynamicWrapper(app, ['vote'], () => import('../routes/Darkhut/Vote')),
    },
    '/darkhut/time_table': {
      component: dynamicWrapper(app, ['timetable'], () => import('../routes/Darkhut/TimeTable')),
    },
    '/darkhut/feedback': {
      component: dynamicWrapper(app, ['feedback'], () => import('../routes/Darkhut/feedback')),
    },
    // '/darkhut/open_door': {
    //   component: dynamicWrapper(app, [], () => import('../routes/Darkhut/OpenDoor')),
    // },
    // '/admin/cleaning': {
    //   component: dynamicWrapper(app, ['cleaning'], () => import('../routes/Admin/Cleaning')),
    // },
    // '/admin/assessment': {
    //   component: dynamicWrapper(app, [], () => import('../routes/Admin/Assessment')),
    // },
    '/admin/excel_export': {
      component: dynamicWrapper(app, ['excel'], () => import('../routes/Admin/ExcelExport')),
    },
    '/admin/personnel': {
      component: dynamicWrapper(app, ['personnel'], () => import('../routes/Admin/Personnel')),
    },
    '/admin/workload': {
      component: dynamicWrapper(app, ['workloadmanage'], () => import('../routes/Admin/Workload')),
    },
    '/admin/vote': {
      component: dynamicWrapper(app, ['vote'], () => import('../routes/Admin/Vote')),
    },
    /**
     * 非菜单路由要注明权限
     */
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
      authority: [admin, office, normal],
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
      authority: [admin, office, normal],
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../routes/User/Login')),
    },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
