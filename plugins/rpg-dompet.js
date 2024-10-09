let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
    m.reply(`💴Your Money $${global.db.data.users[who].money}`)
}
handler.help = ['dompet [@user]']
handler.tags = ['rpg']
handler.command = /^(dompet|uang|money)$/i
module.exports = handler