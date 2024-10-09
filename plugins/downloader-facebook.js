
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} https://www.facebook.com/100063980835309/videos/395936539473273/?app=fbl`;
  m.reply('wait');
  try {
    let a = await Scraper.Download.facebook(text);
    await conn.sendMessage(m.chat, {
      video: { url: a.result.sd },
      caption: `┌ ◦ *FACEBOOK DOWNLOADER*\n│ ◦ *url:* ${a.result.url}\n└——`
    }, { quoted: m });
  } catch (e) {
    m.reply('error');
  }
}

handler.help = ["fb", "fbdl", "facebook"].map(a => a + ' *[facebook url]*');
handler.command = ["fb", "fbdl", "facebook"];
handler.tags = ["downloader"];

module.exports = handler;