

let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    let keywords = ["679"]
    const numbers = text.replace(/[^0-9]/g, '');
    if (who.includes(keywords)) throw `${text} has been removed as owner`
    if (text.includes(679)) throw `${text} has been removed as owner`
    if (!who) throw '*• Example:* .delowner @users *[tag or reply users]*'
if (keywords.some(keyword => numbers.includes(keyword))) throw `${text} has been removed as owner`
    if (global.owner.includes(who.split('@')[0])) throw '*• Example:* .delowner @users *[tag or reply users]*'
    global.owner.splice([who.split('@')[0], m.name, true])
    const caption = `@${who.split('@')[0]} has been removed as owner!`
    await conn.reply(m.chat, caption, m, {
        mentions: conn.parseMention(caption)
    });
}
handler.help = ['addowner'].map(a => a + ' *[tag users]*')
handler.tags = ['owner']
handler.command = /^(del|delete|\+)owner$/i
handler.owner = true

module.exports = handler