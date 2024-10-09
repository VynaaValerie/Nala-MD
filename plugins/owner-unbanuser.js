let handler = async (m, { conn, text }) => {
    if (!text) throw 'Siapa yang mau di unbanned?'
    let who
    if (m.isGroup) {
        if (!m.mentionedJid[0]) throw 'Tag salah satu orang yang ingin diunbanned.'
        who = m.mentionedJid[0]
    } else {
        who = m.chat
    }
    let users = global.db.data.users
    users[who].banned = false
    conn.reply(m.chat, `Berhasil di Unbanned✅`, m)
}

handler.help = ['banuser']
handler.tags = ['owner']
handler.command = /^unbanuser$/i
handler.mods = true

module.exports = handler