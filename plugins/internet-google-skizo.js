
let fetch = require('node-fetch')
let googleIt = require('google-it')
let handler = async (m, { conn, command, args, text }) => {
  let full = /f$/i.test(command)
  let text = args.join` `
  if (!text) throw `*• Example:* ${usedPrefix + command} Minecraft`
  if (skizo == "Your_Apikey") throw `APIKEY key belum diisi. Dapatkan APIKEY key gratis atau berbayar di https://skizo.tech dan masukkan ke file setting.js.`
  let url = 'https://google.com/search?q=' + encodeURIComponent(text)
  let search = await googleIt({ query: text })
  let msg = search.map(({ title, link, snippet}) => {
    return `*${title}*\n_${link}_\n_${snippet}_`
  }).join`\n\n`
  try {
    var logos = `https://skizo.tech/api/ssweb?type=desktop&url=${link}&apikey=${skizo}`
	conn.sendFile(m.chat, logos, 'logos.jpg', url + '\n\n' + msg, m)
  } catch (e) {
    m.reply(msg)
  }
}
handler.help = ['google', 'googlef'].map(v => v + ' *[query]*')
handler.tags = ['internet']
handler.command = /^googlef?$/i
handler.fail = null

module.exports = handler