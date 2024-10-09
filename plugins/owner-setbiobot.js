let handler = async (m, { conn, text }) => {
   if (!text) throw `*• Example:* .setbiobot new bio`
     try {
  await conn.updateProfileStatus(text)
        conn.reply(m.chat, 'Successfully Changing Bio Bot', m)
     } catch (e) {
       console.log(e)
       throw `Error`
     }
}
handler.help = ['setbotbio'].map(a => a + ' *[new bio]*')
handler.tags = ['owner']
handler.command = /^(setbotbio)$/i
handler.owner = true

module.exports = handler