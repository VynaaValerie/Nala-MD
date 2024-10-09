
let handler = async (m, { conn, args }) => {
  try {
    let id = args?.[0]?.match(/\d+\-\d+@g.us/) || m.chat;
    
    const uniqueOnline = Object.values(conn.chats[id]?.messages || {}).map(item => item.key.participant).filter((value, index, self) => self.indexOf(value) === index);
    
    const sortedOnline = uniqueOnline.sort((a, b) => a.split('@')[0].localeCompare(b.split('@')[0]));

    const onlineList = sortedOnline.map((k, i) => `*${i + 1}.* @${k.split('@')[0]}`).join('\n') || 'There are no users online at this time.';
    
    await conn.reply(m.chat, `*👥List Online Users:*\n${onlineList}`, m, {
      contextInfo: { mentionedJid: sortedOnline }
    });
  } catch (e) {
    console.error(e);
  }
};

handler.help = ['listonline'].map(a => a + ' *[view status online]*')
handler.tags = ['group'];
handler.command = /^(liston(line)?)/i;
handler.group = true;

module.exports = handler;