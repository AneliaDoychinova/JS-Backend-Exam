const models = require('../models');
const jwt = require('../utils/jwt');
const config = require('../config/config');

module.exports = {
    get: {
        login: (req, res, next) => {
            res.render('loginPage.hbs', { pageTitle: 'Login Page' });
        },

        register: (req, res, next) => {
            res.render('registerPage.hbs', { pageTitle: 'Register Page' });
        },

        logout: (req, res, next) => {
            res.clearCookie(config.cookie).redirect('/home');
        }
    },

    post: {
        login: (req, res, next) => {
            const { username, password } = req.body;

            models.User.findOne({ username }).then((user) => {
                Promise.all([user, user.matchPassword(password)])
                    .then(([user, match]) => {
                        if (!match) {
                            console.log('Password is invalid');
                            return
                        }

                        const token = jwt.createToken({ id: user._id });

                        res
                            .cookie(config.cookie, token)
                            .cookie('username', username)
                            .redirect('/home');

                    })
            })
        },

        register: (req, res, next) => {
            console.log(req.body);
            const { username, password, repeatPassword, amount } = req.body;
            if (password !== repeatPassword) {
                res.render('registerPage.hbs', {
                  errors: {
                    repeatPassword: 'Password and repeat password don\'t match!'
                  }
                });
                return;
            }
            let amountNum = +amount;
            models.User.create({ username, password, amountNum }).then((registeredUser) => {
                const token = jwt.createToken({ id: registeredUser._id });

                res
                    .cookie(config.cookie, token)
                    .cookie('username', username)
                    .redirect('/user/login');
            }).catch(err => {
                if (err.name === 'MongoError' && err.code === 11000) {
                  res.render('registerPage.hbs', {
                    errors: {
                      username: 'Username already taken!'
                    }
                  });
                  return;
                }
                next(err);
              });
        }
    }
};