
let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    conn.ttsearch = conn.ttsearch ? conn.ttsearch : {};
    if (!text) {
      return  conn.reply(m.chat, `*Example:* ${usedPrefix + command}  tutorial diy`, m);
    }
    
    m.reply(wait);
    let res = await Scraper.Api.ttSearch(text);    
    let hasil = res.videos.map((v, index) => `*${index + 1}.* *Title:* ${v.title}\n*Region:* ${v.region}`).join("\n\n");
    let url = 'https://tikwm.com' + res.videos[0].cover;  
    let { key } = await conn.sendMessage(m.chat,{image: {url: url},caption: hasil},{quoted: m});
    await conn.reply(m.chat,`Type the number *1 - ${res.videos.length}* according to the message above`, null)
    conn.ttsearch[m.sender] = res;
  } catch (error) {
    console.log(error);
   conn.reply(m.chat, 'An error occurred while executing the command', m);
  }
};

handler.before = async (m, { conn }) => {
  try {
    conn.ttsearch = conn.ttsearch ? conn.ttsearch : {};
    if (m.isBaileys) return;
    if (!m.text) return;
    if (!conn.ttsearch[m.sender]) return;
    if (isNaN(m.text) || m.text <= 0 || m.text > conn.ttsearch[m.sender].videos.length) return

    let { videos } = conn.ttsearch[m.sender];
    let pilihan = videos[m.text - 1].play;  
    let Video = 'https://tikwm.com' + pilihan;  
    m.reply(wait);
    await conn.sendFile(m.chat, Video, null, videos[m.text - 1].title, m);
    delete conn.ttsearch[m.sender];
  } catch (error) {
    console.log(error);
    conn.reply(m.chat, 'An error occurred while executing the command', m);
  }
};

handler.help = ['tiktoks', 'tiktoksearch', 'ttsearch'].map(a => a + ' *[query]*');
handler.tags = ['internet', 'downloader'];
handler.command = ['tiktoks', 'tiktoksearch', 'ttsearch']
module.exports = handler;