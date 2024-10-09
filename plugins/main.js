export default {
 command: ["ci"]
 owner: false,
 admin: false,
 hidden: false,
 limit: false,
 group: false,
 private: false,

 execute: async function (m, { sock, api, text: prompt, usedPrefix, command }) {
 if (!m.quotex) return m.reply('reply pesan')
 try {
      let id = (await m.getQuotedObj()).msg.contextInfo.forwardedNewsletterMessageInfo
       let teks = '
       teks += '
Channel Id:```' + ' `' + `${id.newsletterJid}` + '`'
      await sock.reply(m.chat, teks.trim(), m)
       } catch (e) {
        throw 'Harus chat dari channel'
     }
 },
 wait: null,
 done: null,
};