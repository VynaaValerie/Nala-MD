let handler = async (m, { conn, text }) => {
    if (!text) throw 'Siapa yang mau di banned?'
    let who
    if (m.isGroup) {
        if (!m.mentionedJid[0]) throw 'Tag salah satu orang yang ingin dibanned.'
        who = m.mentionedJid[0]
    } else {
        who = m.chat
    }
    let users = global.db.data.users
    users[who].banned = true
    conn.reply(m.chat, `Berhasil di banned✅`, m)
}

handler.help = ['banuser']
handler.tags = ['owner']
handler.command = /^banuser$/i
handler.mods = true

module.exports = handler