const LocalStrategy = require('passport-local').Strategy;
const { verifyPassword } = require('./hashUtils');
const db = require('../database'); // Import your database connection

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
            try {
                // Fetch the user from the database by username
                const [rows] = await db.query('SELECT um.*,rm.role_name FROM user_master as um LEFT JOIN role_master as rm on rm.role_id_pk =um.role_id_fk  WHERE username = ?', [username]);
                if (rows.length === 0) {
                    return done(null, false, { message: 'Username not Found'});
                }

                const user = rows[0];
                   // Check if user_status is inactive (0)
                    if (user.user_status === 0) {
                        return done(null, false, { message: 'User account is inactive' });
                    }
                // Verify the password using the stored hash
                const isValid = verifyPassword(password, user.password);
                if (!isValid) {
                    return done(null, false, { message: 'Password Incorrect'});
                }
               
                
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.user_id_pk);
    });

    passport.deserializeUser(async (user_id_pk, done) => {
        try {
            const [rows] = await db.query('SELECT um.*,rm.role_name FROM user_master as um LEFT JOIN role_master as rm on rm.role_id_pk =um.role_id_fk WHERE user_id_pk = ?', [user_id_pk]);
            if (rows.length === 0) {
                return done(new Error('User not found'));
            }
            done(null, rows[0]);
        } catch (error) {
            done(error);
        }
    });
};
