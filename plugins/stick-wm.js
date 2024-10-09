
const { sticker } = require('../function/sticker')
const uploadFile = require('../function/uploadFile')
const uploadImage = require('../function/uploadImage')
let { webp2png } = require('../function/webp2mp4')

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  if (/video/g.test(mime)) {
    if ((q.msg || q).seconds > 10) {
      return m.reply('*❕ Maximum 10 seconds*')
    }
  }

  try {
    let img = await q.download() 
    let url = await uploadFile(img)

    if (!img) {
      throw `*• Example:* ${usedPrefix + command} *[Reply/send Media]*`
    }

    let ah = text.split("|")
    conn.sendImageAsSticker(m.chat, url, m, { packname: ah[0], author: ah[1] })
  } catch {
    throw `*• Example:* ${usedPrefix + command} *[Reply/send Media]*`
  }
}

handler.help = ['wm', 'watermark'].map(a => a + ' *[reply/send media]*')
handler.tags = ['sticker']
handler.command = /^wm|watermark?$/i

module.exports = handler