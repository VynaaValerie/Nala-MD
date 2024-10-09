
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `masukkan teks`
  let type = (args[0] || '').toLowerCase()
  switch (type) {
    case "handler": 
      let code = '```javascript\nlet handler = async (m, { conn, text, usedPrefix, command }) => {\n  // Kode Anda\n}\nhandler.help = ["Help"]\nhandler.tags = ["tags menu"]\nhandler.command = ["command"]\nmodule.exports = handler```'
      let key = await m.reply("Contoh plugins jenis handler: ")
      await conn.reply(m.chat, code, key)
      break 
    default:
      if (!/[01]/.test(command)) return m.reply("Tidak valid")
  }
}
handler.command = handler.help = ["example"]
module.exports = handler