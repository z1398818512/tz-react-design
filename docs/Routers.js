import React from 'react';
import Bundle from './lazyload';
import locales from './locales';
/* eslint import/no-webpack-loader-syntax: off */
import QuickStart from 'bundle-loader?lazy&name=quick-start!./pages/quick-start';
import theme from 'bundle-loader?lazy&name=theme!./pages/theme';
// import icon from 'bundle-loader?lazy&name=icon!./pages/icon';
// import button from 'bundle-loader?lazy&name=button!./pages/button';
import message from 'bundle-loader?lazy&name=message!./pages/message';
import upload from 'bundle-loader?lazy&name=upload!./pages/upload';
import Tqdeal from 'bundle-loader?lazy&name=Tqdeal!./pages/Tqdeal';
import TableHoc from 'bundle-loader?lazy&name=tableHoc!./pages/tableHoc';

/* eslint import/no-webpack-loader-syntax: off */

const getLang = key => {
  const locale = localStorage.getItem('WUI_LANG') || 'cn';
  const map = locales[locale] || {};
  return key.split('.').reduce((a, b) => {
    const parent = map[a];
    if (b) {
      return (parent || {})[b];
    }
    return parent;
  });
};
const asyncComponent = comp => props => {
  return (
    <Bundle load={comp}>
      {About => {
        return (
          <About
            locale={{
              show: getLang('markdown.show'),
              hide: getLang('markdown.hide'),
            }}
            {...props}
          />
        );
      }}
    </Bundle>
  );
};

const routes = {
  documents: [
    {
      path: '/:lang/quick-start',
      exact: true,
      component: asyncComponent(QuickStart),
    },
    { path: '/:lang/theme', component: asyncComponent(theme) },
  ],
  components: {
    Basic: [
      { path: '/:lang/message', component: asyncComponent(message) },
      { path: '/:lang/Tqdeal', component: asyncComponent(Tqdeal) },
      { path: '/:lang/tableHoc', component: asyncComponent(TableHoc) },
    ],
    Form: [{ path: '/:lang/upload', component: asyncComponent(upload) }],
    'Data Display': [],
    Navigation: [],
    Feedback: [],
    Other: [],
  },
  redirect: [
    // 重定向到 quick start 页面
    { path: '', redirect: '/cn/quick-start' },
  ],
};

export { routes, getLang };
