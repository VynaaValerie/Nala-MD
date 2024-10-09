
let handler = async (m, { conn, text }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} @user & number`
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw  `*• Example:* ${usedPrefix + command} @user & number`
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (isNaN(txt)) throw '!! Only Number'
  let xp = parseInt(txt)
  let exp = xp
  if (xp >= 2000000) throw `!! Max add Xp: 2000000`
  else if (xp < 2000000) {
  let users = global.db.data.users
  users[who].exp += xp
  
  conn.reply(m.chat, `Congratulations @${who.split`@`[0]}. You get +${xp}XP!`, m, { mentions: [who] }, {
        contextInfo: {
            mentionedJid: [who]
        }
    }) }
}
handler.help = ['addxp'].map(a => a + " *[@user & number]")
handler.tags = ['owner']
handler.command = /^addxp$/
handler.rowner = false
handler.premium = false
handler.rowner = true

module.exports = handler