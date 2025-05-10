const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decode the token
        console.log('Decoded JWT:', decoded);  // Log decoded token for debugging
        req.user = decoded;  // Attach decoded token data to req.user
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(401).json({ message: 'Token is not valid.' });
    }
};

module.exports = protect;