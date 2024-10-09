let handler = async (m, { conn, text, usedPrefix, command }) => {
  function no(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '')
  }

  if (!text) {
    return conn.reply(m.chat, `*❏ GET NUMBER*\n\n• ${usedPrefix}unprem number|days\n*Example:* ${usedPrefix}${command} 6285333333333\n\n• ${usedPrefix}${command} @tag\n*Example:* ${usedPrefix}${command} @6285333333333`, m)
  }
  
  text = no(text) + "@s.whatsapp.net"
  
  if (!global.db.data.users[text]) {
    return conn.reply(m.chat, `User @${text.split('@')[0]} tidak ditemukan dalam database.`, m, { contextInfo: { mentionedJid: [text] } })
  }
  
  global.db.data.users[text].premium = false
  global.db.data.users[text].premiumDate = 0
  
  conn.reply(m.chat, `*Berhasil menghapus akses premium untuk @${text.split('@')[0]}.*`, m, { contextInfo: { mentionedJid: [text] } })
}

handler.help = ['delprem']
handler.tags = ['owner']
handler.command = /^(unprem|delprem)$/i
handler.owner = true
handler.fail = null
module.exports = handler