import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 如果项目要请求真实数据，需要 mock: false
  mock: false,
  proxy: {
    '/api': {
      // 跨域处理
      'target': 'http://127.0.0.1:7001/',
      'changeOrigin': true
    }
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: './home/index',
          title: '首页'
        },
        {
          path: '/order',
          component: './order/index',
          title: '订单',
          auth: true
        },
        {
          path: '/user',
          component: './user/index',
          title: '我的',
          auth: true
        },
      ]
    }
  ],
});
