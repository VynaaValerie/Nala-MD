const { pinterest } = require('../lib/scraper');

let handler = async (m, { conn, usedPrefix, text, command }) => {
  if (!text) {
    return m.reply(`Contoh: ${usedPrefix + command} mobil`);
  }

  m.reply('Menunggu hasil...');

  try {
    let results = await pinterest(text);
    if (!results || results.length === 0) {
      return m.reply('Tidak ada hasil yang ditemukan.');
    }

    let result = results[Math.floor(Math.random() * results.length)];
    await conn.sendMessage(m.chat, { image: { url: result }, caption: `*Pinterest:* ${text}` }, { quoted: m });
  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan. Silakan coba lagi nanti.');
  }
};

handler.help = ['pinterest2'].map(a => a + ' *[query]*');
handler.tags = ['tools', 'internet'];
handler.command = /^(pinterest2|pin2)$/i;

module.exports = handler;