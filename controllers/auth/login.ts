import { Request, Response } from 'express';

import loginModel from '../../models/authentication/login';

const getLoginPage = async (req: Request, res: Response) => {
  if (typeof req.session.client === 'object') {
    req.session.client = null;
  }

  res.render('auth/login', {
    authFailed: req.query.authFailed === 'yes' ? true : false,
  });
};

const postLoginPage = async (req: Request, res: Response) => {
  const payload: object = req.body;

  const accountExists = await loginModel.accountExists(
    payload.email,
    payload.password
  );

  if (typeof accountExists === 'object') {
    req.session.client = accountExists;
    res.redirect('/home');
  } else {
    res.redirect('/login/?authFailed=yes');
  }
};

export default {
  getLoginPage,
  postLoginPage,
};
