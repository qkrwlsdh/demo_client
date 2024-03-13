// # main/frontend/src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

// "/api" 경로가 시작하면 프록시 미들웨어를 실행한다.
module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'https://open-api.kakaopay.com',
      changeOrigin: true
    })
  );
};