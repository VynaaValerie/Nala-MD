const uploadImage = require('../function/uploadImage')
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `• *Example :* ${usedPrefix + command} *[Top Text|Bottom Text]*`

    let [atas, bawah] = text.split('|')

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `• *Example :* ${usedPrefix + command} *[reply/send media]*`

    let img = await q.download()
    let url = await uploadImage(img) // Assuming uploadImage function is defined elsewhere and returns a valid URL
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas.trim() : '')}/${encodeURIComponent(bawah ? bawah.trim() : '')}.png?background=${url}`
    
    conn.sendImageAsSticker(m.chat, meme, m, { packname: packname, author: author })
    
}

handler.help = ['stickermeme'].map(a => a + ' *[Top|Bottom text]*')
handler.tags = ['tools']
handler.command = /^(s(tic?ker)?me(me)?)$/i
handler.limit = false

module.exports = handler