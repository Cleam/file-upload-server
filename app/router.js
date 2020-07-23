'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app });
  router.get('/', controller.home.index);

  // router.group({ name: 'utils', prefix: '/' }, router => {
  //   const { captcha, emailCode } = controller.utils;
  //   router.post('/captcha', captcha);
  //   router.post('/emailCode', emailCode);
  // });

  router.get('/captcha', controller.utils.captcha);
  router.get('/emailCode', controller.utils.emailCode);
  router.post('/uploadFile', controller.utils.uploadFile);
  // router.get('/user/register', controller.user.register);
  router.group({ name: 'user', prefix: '/user' }, router => {
    const { register, login, info } = controller.user;
    router.post('/register', register);
    router.post('/login', login);
    router.get('/info', jwt, info);
  });
};
