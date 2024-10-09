const crypto = require('crypto');

// Fungsi untuk mendekripsi teks
function decryptText(encryptedText, key, iv) {
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

let decryptHandler = async (m, { conn, text }) => {
    if (!m.quoted || !m.quoted.text) {
        return m.reply('Please reply to the encrypted text message.');
    }

    // Mendapatkan teks yang di-reply
    const [encryptedText, keyHex, ivHex] = m.quoted.text.split('\n');

    if (!encryptedText || !keyHex || !ivHex) {
        return m.reply('Invalid encrypted message format. Make sure to include the encrypted text, key, and IV.');
    }

    // Konversi kembali key dan iv dari hex ke buffer
    const keyBuffer = Buffer.from(keyHex.split(': ')[1], 'hex');
    const ivBuffer = Buffer.from(ivHex.split(': ')[1], 'hex');

    // Dekripsi teks
    let decryptedText;
    try {
        decryptedText = decryptText(encryptedText.split(': ')[1], keyBuffer, ivBuffer);
    } catch (error) {
        return m.reply('Failed to decrypt the message. Make sure the key and IV are correct.');
    }

    // Mengirim teks yang telah didekripsi
    m.reply(`Decrypted Text: ${decryptedText}`);
};

decryptHandler.help = ['dec *[reply to encrypted message]*'];
decryptHandler.tags = ['encryption'];
decryptHandler.command = ['dec'];
module.exports = decryptHandler;