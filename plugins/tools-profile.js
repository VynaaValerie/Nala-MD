const fetch = require('node-fetch');
const PhoneNumber = require('awesome-phonenumber');

const handler = async (m, { conn }) => {
  let pp = './src/avatar_contact.png';
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

  try {
    // Ambil URL gambar profil pengguna
    pp = await conn.profilePictureUrl(who, 'image');
  } catch (e) {
    console.error('Could not fetch profile picture:', e);
  }

  // Ambil informasi pengguna dari DATABASE
  const userData = global.db.data.users[who];
  if (!userData) return conn.sendMessage(m.chat, 'User not found in database.', { quoted: m });

  const { name = '', premium = false, level = 0, limit = 0, money = 0, balance = 0, exp = 0, registered = false, age = 0, bank = 0, health = 100 } = userData;
  const username = conn.getName(who);

  // Format pesan profil
  const profileMsg = `
✧──────[ *PROFILE* ]─────✧
📇 • *Name:* ${username} ${registered ? name : ''}
📞 • *Number:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
❤️ • *Health:* ${health}
💻 • *Limit:* ${limit}
💼 • *Exp:* ${exp}
⌛ • *Age:* ${age}
🎚️ • *Level:* ${level}
💰 • *Money:* $${money}
🏦 • *Bank:* $${bank}
🌟 • *Premium:* ${premium ? '✅' : '❌'}
📑 • *Registered:* ${registered ? '✅' : '❌'}
⛔ • *Banned:* ❌
`.trim();

  const mentionedJid = [who];

  // Kirim pesan beserta file gambar profil
  conn.sendMessage(m.chat, { image: { url: pp }, caption: profileMsg, mentions: mentionedJid }, { quoted: m });
};

handler.help = ['profile [@user]'];
handler.tags = ['tools'];
handler.command = /^profile|pp$/i;

module.exports = handler;