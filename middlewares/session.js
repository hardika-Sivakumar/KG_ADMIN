const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'KG_SECRET_KEY';

function issueToken(user) {
    // user = { email, role }
    return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = issueToken;
