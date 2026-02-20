require('dotenv').config(); 
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

// Check if ENCRYPTION_KEY exists
if (!process.env.ENCRYPTION_KEY) {
    console.error('ERROR: ENCRYPTION_KEY is not set in .env file');
    process.exit(1);
}

// AES-256 requires exactly 32 bytes key (from hex string)
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

function encrypt(text) {
    const iv = crypto.randomBytes(16); // Generate new IV for each encryption
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted
    };
}

function decrypt(encryptedData, ivHex) {
    const decipher = crypto.createDecipheriv(
        algorithm,
        key,
        Buffer.from(ivHex, 'hex')
    );
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encrypt, decrypt };