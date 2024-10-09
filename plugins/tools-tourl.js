const { UploadFileUgu, TelegraPh } = require('../lib/uploader')
const fs = require('fs')

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw '*Bot media found!!*'
  try {
    let media = await conn.downloadAndSaveMediaMessage(q)
    if (/image/.test(mime)) {
      let anu = await TelegraPh(media)
      m.reply(anu)
    } else if (!/image/.test(mime)) {
      let anu = await UploadFileUgu(media)
      m.reply(anu)
    }
    await fs.unlinkSync(media)
  } catch (e) {
    console.error(e)
    m.reply('Terjadi kesalahan saat mengunggah atau mengonversi media.')
  }
}

handler.help = ['tourl'].map(a => a + ' *[Reply/send Media]*')
handler.tags = ['tools']
handler.command = /^(upload|tourl)$/i

module.exports = handler