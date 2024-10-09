let handler = async (m, { conn, text, usedPrefix, command }) => {
const user = global.db.data.users[m.sender]
const lastDeliveryTime = user.lastredeem || 0;
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - lastDeliveryTime
if (timeDiff < 3000000) {
    const remainingTime = 300000 - timeDiff;
    const remainingTimeString = clockString(remainingTime);
    conn.reply(m.chat, `‼️ You have claimed the redeem code`, m);
    return;
  }
 if (!text) throw `*• Example:* .claimredeem ${db.data.redeem}`
let redeem = db.data.redeem
if (text == redeem) {
user.limit = 200
user.exp = 5000
user.money = 1000
user.lastredeem = Date.now()
m.reply(`🎉 congratulations on getting\n\nlimit: ${user.limit}\nexp: ${user.exp}\nmoney: $${user.money}\n*Thank you for using my kreybot service. I hope you are satisfied with my bot*`)
} else m.reply('*[ INVALID REDEEM CODE ]*')
}
handler.help = ["claimredeem"].map(a => a + ' *[code redeem]*')
handler.tags = ["rpg"]
handler.command = ["claimredeem"]
module.exports = handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return ['\n' + d, ' *Days*\n ', h, ' *Hours*\n ', m, ' *Minute*\n ', s, ' *Second* '].map(v => v.toString().padStart(2, 0)).join('');
}