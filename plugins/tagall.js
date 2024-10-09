let handler = async (m, { conn, text, participants }) => {
    let teks = `*[ TAG ALL MEMBER ]*
*• Message : ${text ? text : 'kosong'}*\n\n`
				for (let mem of participants) {
					teks += `• @${mem.id.split('@')[0]}\n`
				}
				conn.sendMessage(m.chat, {
					text: teks,
					mentions: participants.map(a => a.id)
				}, {
					quoted: m
				})
  }
  
  handler.help = ['tagall']
  handler.tags = ['group']
  handler.command = ['tagall']
  handler.admin = true
  handler.group = true
  
  module.exports = handler