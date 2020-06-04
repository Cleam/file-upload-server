'use strict';

const Controller = require('egg').Controller;

/*
{
  code: 0,  // 0：成功，-1：失败，其他根据业务来定，如：10001：登录失效，……
  message: '', // 失败提示信息
  errors: {}  // 失败错误信息，开发、测试阶段用，线上不用。
}
*/

class BaseController extends Controller {
  message(message) {
    this.ctx.body = {
      code: 0,
      message,
    };
  }
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }
  error(message, code = -1, errors = {}) {
    this.ctx.body = {
      code,
      message,
      errors,
    };
  }
}

module.exports = BaseController;
