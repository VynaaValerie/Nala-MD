
let handler = async (m, { conn, participants, groupMetadata }) => {
    const getGroupAdmins = (participants) => {
        admins = []
        for (let i of participants) {
            i.admin === "admin" ? admins.push(i.id) : ''
        }
        return admins
    }
    let pp = './src/avatar_contact.png'
    try {
        pp = await conn.profilePictureUrl(m.chat, 'image')
    } catch (e) {
    } finally {
        let { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink } = global.db.data.chats[m.chat]
        const groupAdmins = getGroupAdmins(participants)
        let listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.split('@')[0]}`).join('\n')
        let text = `*Name:* 
${groupMetadata.subject}
*ID GROUP:* 
${m.chat.split`-`[0]}
*Group Admins:*
${listAdmin}\n\n` + "```J Don't tag admins carelessly\nthey will be kicked```".trim()
        m.reply(text)
    }
}
handler.help = ['tagadmin', 'min'].map(a => a + ' *[tag admin]*')
handler.tags = ['group']
handler.command = /^(tagadmin|min)$/i

handler.group = true

module.exports = handler