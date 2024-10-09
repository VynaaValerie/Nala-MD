const fetch = require('node-fetch');
const { UploadFileUgu, TelegraPh } = require('../lib/uploader');
const fs = require('fs');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) return m.reply('*Bot media found!!*');

  let media = await conn.downloadAndSaveMediaMessage(q);
  m.reply('Tunggu sebentar')
  try {
    let anu;
    if (/image/.test(mime)) {
      anu = await TelegraPh(media);
    } else {
      anu = await UploadFileUgu(media);
    }
    
    let res = await fetch(`https://itzpire.site/tools/jadianime?url=${anu}`);

    let json = await res.json(); // Pastikan untuk memanggil .json() setelah menunggu fetch selesai
    
    // Mengirim hasil prompt sebagai balasan
    if (json.result) {
      conn.sendMessage(m.chat, {image:{url: json.result}, caption: 'nih'}, {quoted: m});
    } else {
      throw new Error("No result found in JSON response");
    }
  } catch (e) {
    console.error(e);
    m.reply("*Tidak Merespons*");
  } finally {
    // Hapus file media setelah digunakan untuk menghemat ruang
    fs.unlinkSync(media);
  }
}

handler.help = ['toanime']
handler.tags = ["ai"];
handler.command = ['toanime'];
handler.premium = true
module.exports = handler;