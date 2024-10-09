
let handler = async (m, { conn, text, usedPrefix, command, participants }) => {
  db.data.redeem = db.data.redeem || '';
  
  if (!text) throw `*• Example:* ${usedPrefix + command} new redeem`;
  
  db.data.redeem = text;
  m.reply('✅ Successfully created the redeem code');
  
  const q = {
    "key": {
      "remoteJid": "status@broadcast",
      "participant": "0@s.whatsapp.net",
      "fromMe": false,
      "id": ""
    },
    "message": {
      "conversation": "Redeem code from owner 👑"
    }
  };
  
  let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isGroup && !chat.read_only && !chat.announce).map(v => v[0]);
  
  for (let id of groups) {
    let participantIds = participants.map(a => a.id);
    let hasil = `New Redeem Code for today ‼️\nredeem code: ${text}\ntype *.claimredeem <code>* to claim the redeem code`;
    await conn.reply(id, hasil, q, { contextInfo: { mentionedJid: participantIds } });
  }
};

handler.help = ["set-redeem"].map(a => a + ' *[new redeem]*');
handler.tags = ["owner"];
handler.command = ["set-redeem"]
handler.owner = true;
module.exports = handler;