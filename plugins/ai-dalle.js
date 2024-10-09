
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} cat`
m.reply('Tunggu Sebentar')
try {
let gpt = await (await fetch(`https://itzpire.site/ai/dalle?prompt=${text}`)).json()
conn.sendFile(m.chat, gpt.result,null,"*[ EMI - DIFFUSION ]* " + '\n*• Prompt:* ' + text)
 } catch(e) {
 throw "`*Command Not Responded*`"
}
}
handler.help = ["dalle"]
handler.tags = ["ai"]
handler.command = ["dalle"]
handler.premium = true
module.exports = handler

