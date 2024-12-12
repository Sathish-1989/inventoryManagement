const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // If the token has expired or is invalid
            return res.status(401).json({ message: 'Token expired or invalid. Please log in again.' });
        }
        
        req.userId = decoded.userId; // Save the user ID for future requests
        next();
    });
};

module.exports = verifyToken;
