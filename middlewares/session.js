// middlewares/session.js
const session = require('express-session');

const sessionMiddleware = session({
    secret: 'KG_SCECRET_KEY', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, 
        secure: false, 
    }
});

module.exports = sessionMiddleware;
