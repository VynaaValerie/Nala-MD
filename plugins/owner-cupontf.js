let handler = async (m, { conn, args, usedPrefix, command, owner }) => {
    if (args.length < 3) {
        return conn.reply(m.chat, `Gunakan format ${usedPrefix}${command} <cupon> <jumlah> <@tag>\ncontoh penggunaan: *${usedPrefix}${command} cupon 1 @tag*`.trim(), m)
    } else try {
        let type = (args[0] || '').toLowerCase()
        let count = args[1] && args[1].length > 0 ? Math.min(9999999999999999, Math.max(parseInt(args[1]), 1)) : Math.min(1)
        let who = m.mentionedJid ? m.mentionedJid[0] : (args[2].replace(/[@ .+-]/g, '').replace(' ', '') + '@s.whatsapp.net')
        if(!m.mentionedJid || !args[2]) throw 'Tag salah satu, atau ketik Nomernya!!'
        let users = global.db.data.users
        switch (type) {
            case 'cupon':
                if (global.db.data.users[m.sender].cupon >= count * 1) {
                    try {
                        global.db.data.users[m.sender].cupon -= count * 1
                        global.db.data.users[who].cupon += count * 1
                        conn.reply(m.chat, `Berhasil mentransfer cupon sebesar ${count}`.trim(), m)
                    } catch (e) {
                        global.db.data.users[m.sender].cupon += count * 1
                        m.reply('Gagal Menstransfer')
                        console.log(e)
                        if (owner) {
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
                            }
                        }
                    }
                } else conn.reply(m.chat, `cupon kamu tidak mencukupi untuk mentransfer sebesar ${count}`.trim(), m)
                break 
             
            default:
                return conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\ncontoh penggunaan: *${usedPrefix}transfer cupon 1 @tag*\n\n*List yang bisa di transfer*\ncupon`.trim(), m)
        }
    } catch (e) {
        conn.reply(m.chat, `Format yang anda gunakan salah\n\nGunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\ncontoh penggunaan: *${usedPrefix}transfer cupon 1 @tag*`.trim(), m)
        console.log(e)
        if (owner) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.reply(jid, 'Transfer.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', m)
            }
        }
    }
}
    
handler.help = ['tfcupon']
handler.tags = ['owner']
handler.command = /^(tfc)$/i
handler.owner = true
handler.mods = false
handler.group = true

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler