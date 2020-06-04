'use strict';

const Controller = require('egg').Controller;
const svgCaptcha = require('svg-captcha');

class CaptchaController extends Controller {
  async get() {
    const captcha = svgCaptcha.create({
      size: 4,
      noise: 3,
    });
    const ctx = this.ctx;
    ctx.session.captcha = captcha.text;
    console.log(captcha.text);
    // {data: '<svg.../svg>', text: 'abcd'}
    ctx.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }
}

module.exports = CaptchaController;
