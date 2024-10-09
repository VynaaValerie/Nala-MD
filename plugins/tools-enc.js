const crypto = require('crypto');

// Algoritma dan kunci enkripsi
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16);  // 16 bytes IV

// Fungsi untuk mengenkripsi teks
function encryptText(text, key, iv) {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Fungsi untuk mendekripsi teks
function decryptText(encryptedText, key, iv) {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!m.quoted || !m.quoted.text) {
        return m.reply('Please reply to a text message.');
    }

    // Mendapatkan teks yang di-reply
    const originalText = m.quoted.text;

    // Enkripsi teks
    const encryptedText = encryptText(originalText, key, iv);

    // Menyimpan kunci dan iv untuk dekripsi (biasanya, ini disimpan dengan aman)
    const keyIvData = { key: key.toString('hex'), iv: iv.toString('hex') };

    // Mengirim teks yang telah dienkripsi
    m.reply(`Encrypted Text: ${encryptedText}\nKey: ${keyIvData.key}\nIV: ${keyIvData.iv}`);
};

handler.help = ['enc *[reply to a text message]*'];
handler.tags = ['encryption'];
handler.command = ['enc'];
module.exports = handler;

// Fungsi untuk mendekripsi teks
function decryptHandler(encryptedText, keyHex, ivHex) {
    const keyBuffer = Buffer.from(keyHex, 'hex');
    const ivBuffer = Buffer.from(ivHex, 'hex');
    return decryptText(encryptedText, keyBuffer, ivBuffer);
}