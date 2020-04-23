const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    ['/auth/google', '/api/*'],
    proxy({
      target: 'http://localhost:8080',
      changeOrigin: false,
    })
  );
};