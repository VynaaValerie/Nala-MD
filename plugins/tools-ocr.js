const { UploadFileUgu, TelegraPh } = require('../lib/uploader');
const fetch = require('node-fetch');

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) throw '*Bot media found!!*';
  try {
    let media = await conn.downloadAndSaveMediaMessage(q);
    if (/image/.test(mime)) {
      let anu = await TelegraPh(media);
      
      let apiUrl = `https://api.ocr.space/parse/imageurl?apikey=${global.ocrapi}&url=${anu}`;
      let response = await fetch(apiUrl);
      let hasil = await response.json();
      m.reply(hasil.ParsedResults[0].ParsedText);
    } else {
      let anu = await UploadFileUgu(media);
      m.reply(anu);
    }
  } catch (e) {
    console.error(e);
    m.reply('Terjadi kesalahan saat mengunggah atau mengonversi media.');
  }
}

handler.help = ['ocr'].map(a => a + ' *[Reply/send Media]*');
handler.tags = ['tools'];
handler.command = /^(ocr|totext)$/i;

module.exports = handler;