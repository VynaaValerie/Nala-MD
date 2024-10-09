
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Contoh:* ${usedPrefix + command} https://tiktok.com/xxxx`

  m.reply(`Tunggu sebentar ya kakak:>`);

    
require('../lib/tiktok').Tiktok(text).then( data => {
conn.sendMessage(m.chat, { caption: `Here you go!`, video: { url: data.nowm }}, {quoted:m})
})
}

handler.help = ['tiktok', 'tt', 'tiktoknowm'].map(v => v + ' *[url tiktok]*');
handler.tags = ['downloader'];
handler.command = /^(tiktok|tt|ttdl|ttnowm)$/i;

module.exports = handler;