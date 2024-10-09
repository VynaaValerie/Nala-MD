
async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true;
  let chat = global.db.data.chats[m.chat];
  let sender = global.db.data.chats[m.sender];
  let isFoto = m.mtype;
  let hapus = m.key.participant;
  let bang = m.key.id;
  if (chat.antiFoto && isFoto) {
    if (isFoto === "imageMessage") {
      if (isAdmin || !isBotAdmin) {
      } else {
        m.reply(`*Anti image:* Admin turn on anti image, you can't send image to this group`);
        return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }});
      }
      return true;
    }
  }
  return true;
}

module.exports = {
 before
};