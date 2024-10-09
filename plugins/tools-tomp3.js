
let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q || q.msg).mimetype || q.mediaType || ''
    if (!/video|audio/.test(mime)) throw `*• Example:* ${usedPrefix + command} *[reply/send media]*`
    let media = await q.download()
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw `*❕ I can't convert this media*`
    conn.sendMessage(m.chat, { audio: audio.data,  mimetype: 'audio/mpeg' }, { quoted: m })
}
handler.help = ['tomp3'].map(a => a + ' *[reply/send media]*')
handler.tags = ['tools']
handler.alias = ['tomp3', 'toaudio']
handler.command = /^to(mp3|audio)$/i

module.exports = handler