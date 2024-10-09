const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

let handler = async (m, { conn, text }) => {
    if (!m.quoted || !m.quoted.text) {
        return m.reply('Please reply to a JavaScript code.');
    }

    // Mendapatkan teks yang di-reply
    const jsCode = m.quoted.text;

    // Obfuscate data file
    const obfuscatedData = JavaScriptObfuscator.obfuscate(jsCode, {
        compact: true,
        controlFlowFlattening: true,
    }).getObfuscatedCode();

    // Mengirim kembali teks yang telah diobfusikasi
    m.reply(`${obfuscatedData}`);
};

handler.help = ['encjs *[reply to js code]*'];
handler.tags = ['encryption'];
handler.command = ['encjs'];
module.exports = handler;