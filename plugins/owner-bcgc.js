
let handler = async (m, { conn, text, participants }) => {
      let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
      let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
      let teks = text ? text : cc.text
      conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m)
      for (let id of groups) {
        let participantIds = participants.map(a => a.id)
        await conn.reply(id,"*[ BROADCAST  GROUP ]*\n\n" + teks, null, { contextInfo: { mentionedJid:  participantIds } }).catch(_ => _)
      }
      m.reply(`Selesai Broadcast ${groups.length} Group`)
    }
    
    handler.help = ['broadcastgroup', 'bcgc'].map(v => v + ' *[message]*')
    handler.tags = ['owner']
    handler.command = /^(broadcast|bc)(group|grup|gc)$/i
    handler.owner = true
    module.exports = handler
    
    const more = String.fromCharCode(8206)
    const readMore = more.repeat(4001)
    
    const randomID = length => require('crypto').randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)