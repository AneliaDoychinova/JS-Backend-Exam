const jwt = require('./jwt');
const error = require('./error')
const authCookie = 'auth_cookie';
const models = require('../models');

function auth(isAuth = true) {
    return async function (req, res, next) {
        const token = req.cookies[authCookie] || '';

        try {
            const data = await jwt.verifyToken(token);
            const user = await models.User.findById(data.id);

            req.user = user;
            next();
        } catch (e) {
            if (!isAuth) {
                next();
                return;
            }

            if (e.message === 'jwt must be provided' || e.message === 'token expired') {
                error(res, 'authentication', e.message);
                res.render('/users/login');
                return;
            }

            next(e);
        }
    }
}

module.exports = auth;