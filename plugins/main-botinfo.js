
let handler = async (m, { conn }) => {
  let wm = global.wm
  let _uptime = process.uptime() * 1000
  let uptimex = clockString(_uptime)
  let nomor = conn.user.jid
  let name = conn.getName(conn.user.jid, 'image')
  let pp = await conn.profilePictureUrl(conn.user.jid, 'image').catch((_) => "https://telegra.ph/file/1a2ce69ce7445f80d1421.png");
  let fkontak = {
    key: {
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Bot\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  };
  const text = 'krey';
const blurRadius = 90;
const font = 'Font Family Name'; // Ganti dengan nama font yang sudah didaftarkan
const fontSize = 80;
const width = 500;
const height = 200;
const backgroundImageUrl = thumb
const avatarImageUrl = pp
  let akiraa = `┌  ◦ *Bot Info:*
│  ◦ *Name:* ${namebot}
│  ◦ *Links:* wa.me/${conn.user.jid.split("@")[0]}
│  ◦ *Modes:* ${global.opts['self'] ? 'Self' : 'Public'}
│  ◦ *User:* ${Object.keys(global.db.data.users).length}
│  ◦ *Banned Users:* ${Object.values(global.db.data.users).filter(user => user.banned).length}
│  ◦ *Total Messages Sent:* *${Object.values(global.db.data.users).filter(user => user.banned).length}*
│  ◦ *Total Features:* ${Object.values(features).filter(v => v.help && !v.disabled).map(v => v.help).flat(1).length}
└——`;

await conn.sendMessage(m.chat, { text: akiraa,
    contextInfo: {
        forwardingScore: 9999,
        isForwarded: true,
        businessMessageForwardInfo: {
            businessOwnerJid: conn.user.jid
        }
    }
},{quoted: fkontak});
}

handler.help = ['infobot'].map(a => a + ' *[detail info from bot]*')
handler.tags = ['main']
handler.command = /^(infobot)$/i
handler.limit = false

module.exports = handler

function clockString(ms) {
  let days = Math.floor(ms / (24 * 60 * 60 * 1000))
  let daysms = ms % (24 * 60 * 60 * 1000)
  let hours = Math.floor((daysms) / (60 * 60 * 1000))
  let hoursms = ms % (60 * 60 * 1000)
  let minutes = Math.floor((hoursms) / (60 * 1000))
  let minutesms = ms % (60 * 1000)
  let sec = Math.floor((minutesms) / 1000)
  return `${days} Hari ${hours} Jam ${minutes} Menit ${sec} Detik`
}
