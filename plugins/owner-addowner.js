

let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    if (!who) throw '*• Example:* .addowner @users *[tag or reply users]*'
    if (global.owner.includes(who.split('@')[0])) throw '*• Example:* .addowner @users *[tag or reply users]*'
    global.owner.push([who.split('@')[0], m.name, true])
    const caption = `Now @${who.split('@')[0]} has been made the Owner!`
    await conn.reply(m.chat, caption, m, {
        mentions: conn.parseMention(caption)
    });
}
handler.help = ['addowner'].map(a => a + ' *[tag users]*')
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)owner14$/i
handler.owner = true

module.exports = handler