const jwt = require('jsonwebtoken');

module.exports.authTransaction = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}