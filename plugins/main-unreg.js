const { createHash } = require('crypto')
let handler = async function (m, { args }) {
  if (!args[0]) throw `*• Example:* ${usedPrefix + command} *[Serial number]*`
 
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw '*[ x ] Invalid serial number*'
   let __waktuh = (new Date - global.db.data.users[m.sender].unreglast)
   let _waktuh = (+ 86400000 - __waktuh)
   let waktuh = clockString(_waktuh)
   if (new Date - global.db.data.users[m.sender].unreglast > + 86400000) {
   user.unreglast = new Date * 1
  user.registered = false
  m.reply(`[ ✓ ] Unregister successful!`)
  } else m.reply(`[ x ] You have *${usedPrefix + command}*.\nPlease wait *${time}* to get *${usedPrefix + command}* back.`)
}
handler.help = [''].map(v => 'unreg' + v + ' *[serial number]*')
handler.tags = ['main']

handler.command = /^unreg(ister)?$/i
handler.register = true

module.exports = handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}