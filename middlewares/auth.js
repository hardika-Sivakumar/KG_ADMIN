const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'KG_SECRET_KEY';

// Middleware factory — checks token and role
function authMiddleware(requiredRoles = []) {
    return (req, res, next) => {
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.redirect('/login');
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded; // { email, role }

            if (requiredRoles.length === 0 || requiredRoles.includes(decoded.role)) {
                return next();
            }

            return res.status(403).send('Forbidden: insufficient permissions');
        } catch (err) {
            console.error('JWT verification failed:', err.message);
            return res.redirect('/login');
        }
    };
}

const requireTeacher = authMiddleware(['teacher']);
const requireAdmin = authMiddleware(['admin']);
const requireAdminOrTeacher = authMiddleware(['admin', 'teacher']);

module.exports = {
    requireTeacher,
    requireAdmin,
    requireAdminOrTeacher
};
