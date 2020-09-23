// A middleware runs right after the http request and before the response.

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get token from header

    const token = req.header('x-auth-token');

    // Check if there is token 
    if (!token)
        res.status(401).json({ msg: 'No token found, authorization denied' }) // 401 is authorization error

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'),); // After verification payload is put in decoded.

        req.user = decoded.user; // makes the input user available for all protected routes
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}