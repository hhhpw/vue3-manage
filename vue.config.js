const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

// const port = process.env.port || process.env.npm_config_port || 9527; // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    open: true,
    https: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      // env
      '/bx-api': {
        target: 'https://manage.sandbox.876ex.com',
        changeOrigin: true,
        secure: false,
        ws: false,
        pathRewrite: {
          '^/bx-api': '', // 思路是如果是开发环境，就给所有要代理的接口统一加上前缀，然后代理请求时再统一通过rewrite去掉
        },
        headers: {
          Referer: 'https://manage.sandbox.876ex.com',
        },

        // headers: {
        //   Referer: 'https://manage.sandbox.876ex.com',
        // },
        // onProxyReq(proxyReq, req, res) {
        //   proxyReq.setHeader('X-Added-Foobar', 'foobar');
        // },
        // onProxyRes(proxyRes, req, res) {
        //   proxyRes.headers['X-Dev-Server-Proxy'] = target;
        // },
      },
    },
  },
  chainWebpack: config => {
    // 别称
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@utils', resolve('src/utils'))
      .set('@components', resolve('src/components'))
      .set('@api', resolve('src/api'))
      .set('@utils', resolve('src/utils'))
      .set('@pages', resolve('src/pages'))
      .set('@store', resolve('src/store'))
      .set('@styles', resolve('src/styles'))
      .set('@constant', resolve('src/constant'));

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
};
