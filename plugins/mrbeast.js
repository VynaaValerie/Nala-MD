const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`Contoh: ${usedPrefix + command} hai guys mrbeast here`);
  }
  
  try {
    let res = await fetch(`https://itzpire.site/tools/tts-beast?text=${text}`);
    let json = await res.json();
    await conn.sendMessage(m.chat, { audio: { url: json.result }, mimetype: 'audio/mpeg' }, { quoted: m });
  } catch (error) {
    m.reply('Terjadi kesalahan saat memproses permintaan Anda.');
  }
};

handler.help = ['mrbeast *[text]*'];
handler.tags = ['ai'];
handler.command = ['mrbeast'];

module.exports = handler