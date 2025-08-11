// middlewares/auth.js

function requireTeacher(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    if (req.session.role === 'teacher') {
        return next();
    }

    // Logged in but not a teacher
    return res.status(403).send('Forbidden: Teachers only');
}

function requireAdmin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    if (req.session.role === 'admin') {
        return next();
    }

    // Logged in but not an admin
    return res.status(403).send('Forbidden: Admins only');
}

function requireAdminOrTeacher(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const role = req.session.role;
    if (role === 'admin' || role === 'teacher') {
        return next();
    }

    return res.status(403).send('Access denied: Admins or Teachers only');
}

module.exports = {
    requireTeacher,
    requireAdmin,
    requireAdminOrTeacher
};
