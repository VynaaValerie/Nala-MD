
let handler = m => m

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { user, isBotAdmin, isAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink) {
    await m.reply(`*Anti Link mode:* detect another group link from this group\nsorry I deleted`)
    if (isAdmin) return m.reply('*IsAdmin:* admin detected, i not deleted this')
    if (!isBotAdmin) return m.reply(`*BotAdmin:* I'm not an admin, I can't delete this`)
    let linkGC = ('https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat))
    let isLinkconnGc = new RegExp(linkGC, 'i')
    let isgclink = isLinkconnGc.test(m.text)
    await conn.sendMessage(m.chat, { delete: m.key })
    await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }});
  }
  return true
}

module.exports = handler