const ms = require('ms');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const uptime = process.uptime() * 1000;
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
  
  let uptimeStr = '';
  if (days > 0) uptimeStr += `${days} day${days > 1 ? 's' : ''}, `;
  if (hours > 0) uptimeStr += `${hours} hour${hours > 1 ? 's' : ''}, `;
  if (minutes > 0) uptimeStr += `${minutes} minute${minutes > 1 ? 's' : ''}, `;
  if (seconds > 0) uptimeStr += `${seconds} second${seconds > 1 ? 's' : ''}`;

  m.reply(`*${namebot}*\nhas been active for *${uptimeStr}*`);
}
handler.help = ["runtime","uptime"].map(a => a + ' *[Time running]*')
handler.tags = ["info"]
handler.command = ["runtime","uptime"]
module.exports = handler