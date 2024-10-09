
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} halo`
try {
let gpt = await (await fetch(`https://itzpire.site/ai/gpt-web?q=${text}`)).json()
m.reply("*[ GPT - WEB ]* " + '\n' + gpt.result)
 } catch(e) {
 throw "`*Gpt Not Responded*`"
}
}
handler.help = ["gptweb"].map(a => a + " *[question]*")
handler.tags = ["ai"]
handler.command = ["gptweb"]
module.exports = handler