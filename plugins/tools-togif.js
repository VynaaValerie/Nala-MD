
let { webp2mp4 } = require('../function/webp2mp4')
let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) throw `balas stiker dengan caption *${usedPrefix + command}*`
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw `balas stiker dengan caption *${usedPrefix + command}*`
    let media = await m.quoted.download()
    let out = Buffer.alloc(0)
    if (/webp/.test(mime)) {
        out = await webp2mp4(media)
    }
    conn.sendFile(m.chat, out, 'pp.mp4', wm, m, true, { 
 gifPlayback: true, gifAttribution: 2})
}
handler.help = ['togif']
handler.tags = ['tools']
handler.command = /^(togif)$/i

module.exports = handler