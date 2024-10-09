const uploadImage = require('../function/uploadImage')
let handler = async (m, { conn, text, usedPrefix, command }) => {

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `• *Example :* ${usedPrefix + command} *[reply/send media]*`

    let img = await q.download()
    let url = await uploadImage(img) // Assuming uploadImage function is defined elsewhere and returns a valid URL

    conn.sendImageAsSticker(m.chat, url, m, { packname: packname, author: author })
    
}

handler.help = ['sticker']
handler.tags = ['tools']
handler.command = /^(s(tick(er)?)?|sgif)$/i
handler.limit = false

module.exports = handler