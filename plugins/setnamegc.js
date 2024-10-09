
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*• Example:* ${usedPrefix + command} New Name`
   await conn.groupUpdateSubject(m.chat, text);    
  }

  handler.help = ['setnamegc'].map(a => a + ' *[New name]*')
  handler.tags = ['group']
  handler.command = /^setnamegc$/i
  handler.group = true
  handler.admin = true
  handler.botAdmin = true
  
  module.exports = handler