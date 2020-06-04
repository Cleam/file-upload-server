'use strict';
const md5 = require('md5');
const BaseController = require('./base');
const HashSalt = ':lzg@xyz!!'; // 盐
const rules = {
  email: { required: true, type: 'string' },
  nickname: { required: true, type: 'string' },
  pass: { required: true, type: 'string' },
  captcha: { required: true, type: 'string' },
};

class UserController extends BaseController {
  async register() {
    const { ctx } = this;
    try {
      ctx.validate(rules);
    } catch (error) {
      this.error('参数校验失败！', -1, error);
    }
    const { email, nickname, pass, captcha } = ctx.request.body;
    // console.log({ email, nickname, pass, captcha });
    // 验证码校验
    if (captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
      console.log('[captcha]', captcha);
      // 校验邮箱是否存在
      if (await this.checkEmail(email)) {
        this.error(`邮箱（${email}）已存在`);
      } else {
        const user = await ctx.model.User.create({
          email,
          nickname,
          pass: md5(pass + HashSalt),
        });
        if (user._id) {
          this.message('注册成功');
        }
      }
    } else {
      this.error('验证码不正确');
    }
  }
  async checkEmail(email) {
    return await this.ctx.model.User.findOne({ email });
  }
}

module.exports = UserController;
