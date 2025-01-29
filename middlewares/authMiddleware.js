const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token after "Bearer"

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err); // Log the error for debugging
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // If verification is successful, attach the user ID to the request
        req.userId = decoded.id; // Ensure decoded is not undefined
        next(); // Proceed to the next middleware or route handler
    });
};