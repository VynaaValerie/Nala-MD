let handler = async (m, { conn }) => {
  global.db.data.chats[m.chat].isBanned = false
  m.reply('*[ ✓ ] Successfully unbanned chat!*')
}
handler.help = ['unbanchat'].map(a => a + ' *[unbanchat bot ]*')
handler.tags = ['owner']
handler.command = /^unbanchat|banchat$/i
handler.owner = true

module.exports = handler
