'use strict';
const { Service } = require('egg');
const nodemailer = require('nodemailer');

const fromEmail = 'lizhigao1231@126.com';
const transporter = nodemailer.createTransport({
  host: 'smtp.126.com',
  port: 465,
  secure: true,
  auth: {
    user: fromEmail,
    pass: 'YLCRKXFODXVADHBB',
  },
});

class UtilsService extends Service {
  async sendEmailCode({ email, subject, text, html }) {
    const emailOptions = {
      from: fromEmail,
      cc: fromEmail, // 抄送
      to: email,
      subject,
      text,
      html,
    };
    try {
      await transporter.sendMail(emailOptions);
      return true;
    } catch (error) {
      console.error('发送出错：', error);
      return false;
    }
  }
}

module.exports = UtilsService;
