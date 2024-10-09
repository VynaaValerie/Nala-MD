let handler = async(m, { conn, command }) => {
  let isPublic = command === "public";
  let self = global.opts["self"]

  if(self === !isPublic) return m.reply(`Is it ${!isPublic ? "Self" : "Public"} from earlier ${m.sender.split("@")[0] === global.owner[1] ? "Sister" : "Brother"}`)
  global.opts["self"] = !isPublic
  m.reply(`Success *${!isPublic ? "Self" : "Public"}* bot!`)
}

handler.help = ["self", "public"].map(a => a + ' *[options]*')
handler.tags = ["owner"]
handler.owner = true
handler.command = /^(self|public)/i

module.exports = handler