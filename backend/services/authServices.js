const jwt = require('jsonwebtoken');
var passport = require('passport');
require('dotenv').config();

require('../passport/passportConfig')(passport);


// Login Authentication using username and password
const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred during authentication', error: err });
        }
        if (!user) {
            // Authentication failed
            return res.json({ message: info.message, status: 0 });
        }

        // Log in the user if authentication succeeded
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to log in user', error: err });
            }
            console.log(user,"ssssssss")
            const uDetails = {
                userId: user.user_id_pk,
                username: user.username,
                role_id: user.role_id_fk,
                firstname: user.firstname,
                lastname: user.lastname,
                employeeId: user.employee_no,
                rolename: user.role_name
            };
            
            // Generate JWT token with a 5-minute expiration time
            const token = jwt.sign(uDetails, process.env.JWT_SECRET, { expiresIn: '15m' });
            
            // Send a successful login response with the token and user details
            res.json({ message: 'Login successful', status: 1, token, uDetails });
        });
    })(req, res, next);
};


module.exports = { login };