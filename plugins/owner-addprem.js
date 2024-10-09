
let handler = async (m, { conn, text, usedPrefix, command }) => {
 function no(number) {
 return number.replace(/\s/g, '').replace(/([@+-])/g, '')
 }

 var hl = []
 hl[0] = text.split('|')[0]
 hl[0] = no(hl[0]) + "@s.whatsapp.net"
 hl[1] = text.split('|')[1]

 if (!text) return conn.reply(m.chat, `*[ ADD PREMIUM ]*\n\n• *Example:* ${usedPrefix + command} number|duration\n\n*Input "permanent" for unlimited time`, m)

 if (!hl[1]) return conn.reply(m.chat, `*[ ADD PREMIUM ]*\n\n• *Example:* ${usedPrefix + command} number|duration`, m)
 if (hl[1].toLowerCase() === "permanent") {
 global.db.data.users[hl[0]].premiumDate = "Permanent"
 } else {
   // Modifikasi untuk menambahkan durasi dengan angka
   if(isNaN(hl[1])) return conn.reply(m.chat, 'Please provide a valid duration or input "permanent" for unlimited time', m)
 }

 if (typeof db.data.users[hl[0]] == 'undefined') throw '🔴 User not found'
 var jumlahHari = 86400000 * parseInt(hl[1]) // Menambahkan durasi dengan angka
 var now = new Date() * 1
 global.db.data.users[hl[0]].premium = true
 if (now < global.db.data.users[hl[0]].premiumDate) global.db.data.users[hl[0]].premiumDate += jumlahHari
 else global.db.data.users[hl[0]].premiumDate = now + jumlahHari
 conn.reply(m.chat, `• *UPGRADE PREMIUM*\n\nBerhasil menambahkan akses premium kepada *@${hl[0].split('@')[0]}* selama *${hl[1]} hari*.\n\n*Premium : ${hl[1].toLowerCase() === "permanent" ? "Permanent Time" : msToDate(global.db.data.users[hl[0]].premiumDate - now)}*`, m, {
 contextInfo: {
 mentionedJid: [hl[0]]
 }
 })
 conn.reply(hl[0], `*[ YOU NOW PREMIUM ]*\nSuccessfully added premium access to *@${hl[0].split('@')[0]}* for *${hl[1]} days*.\n\nn*Premium : ${hl[1].toLowerCase() === "permanent" ? "Permanent Time" : msToDate(global.db.data.users[hl[0]].premiumDate - now)}*`, m, {
 contextInfo: {
 mentionedJid: [hl[0]]
 }
 })

}
handler.help = ['addprem'].map(a => a + " *[number|duration]*")
handler.tags = ['owner']
handler.command = /^(addprem)$/i
handler.owner = true
handler.fail = null
module.exports = handler

function msToDate(ms) {
 temp = ms
 days = Math.floor(ms / (24 * 60 * 60 * 1000));
 daysms = ms % (24 * 60 * 60 * 1000);
 hours = Math.floor((daysms) / (60 * 60 * 1000));
 hoursms = ms % (60 * 60 * 1000);
 minutes = Math.floor((hoursms) / (60 * 1000));
 minutesms = ms % (60 * 1000);
 sec = Math.floor((minutesms) / (1000));
 return days + ":" + hours + ":" + minutes + "";
}