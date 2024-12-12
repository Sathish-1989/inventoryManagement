const crypto = require('crypto');

// Hash password using SHA-256 without salt
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Function to verify password
function verifyPassword(inputPassword, storedHash) {
    const hashedInput = hashPassword(inputPassword);
    return hashedInput === storedHash;
}

module.exports = { hashPassword, verifyPassword };
