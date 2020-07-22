'use strict';

const jwt = require('jsonwebtoken');

module.exports = ({ app }) => {
  return async (ctx, next) => {
    const auth = ctx.request.header.authorization;
    if (!auth) {
      ctx.body = {
        code: -666,
        message: '用户未登录',
      };
    }
    const token = auth.replace('Bearer ', '');
    try {
      const info = jwt.verify(token, app.config.jwt.secret);
      ctx.state._id = info._id;
      ctx.state.email = info.email;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        ctx.body = {
          code: -666,
          message: '登录过期',
        };
        return;
      }
      ctx.body = {
        code: -1,
        message: '获取用户信息出错',
      };
    }
    await next();
  };
};
