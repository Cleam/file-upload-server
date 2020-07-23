'use strict';

const BaseController = require('./base');
const svgCaptcha = require('svg-captcha');
const fse = require('fs-extra');
const path = require('path');

class UtilsController extends BaseController {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      noise: 3,
    });
    const ctx = this.ctx;
    ctx.session.captcha = captcha.text;
    console.log('[captcha]', captcha.text);
    // {data: '<svg.../svg>', text: 'abcd'}
    ctx.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }
  async emailCode() {
    const email = this.ctx.query.email;
    const code = Math.random().toString().slice(-4);
    this.ctx.session.emailCode = code;
    console.log('[emailCode]', code);
    const subject = '小泽社区 - 验证码';
    const text = '小泽社区 - 验证码';
    const html = `
      <h2>您的验证码：<em style="color:red;font-size:20px;font-weight:600;"font-style:normal;>${code}</em></h2>
      <p>请注意保密。</p>
    `;
    const st = await this.service.utils.sendEmailCode({ email, subject, text, html });
    if (st) {
      this.message('发送成功');
    } else {
      this.error('发送失败');
    }
  }
  async uploadFile() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    await fse.move(file.filepath, path.resolve(__dirname, `../public/${file.filename}`));
    this.success({
      filename: file.filename,
      filepath: `/public/${file.filename}`,
    });
  }
}

module.exports = UtilsController;
