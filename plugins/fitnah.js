const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, text, usedPrefix, command}) => {
  try {
      
        if (!text) return m.reply(`example *${usedPrefix + command}* @tag|targetmessage|botmessage`);
        var org = q.split("|")[0];
        var target = q.split("|")[1];
        var bot = q.split("|")[2];
        if (!org.startsWith('@')) return m.reply('Tag someone');
        if (!target) return m.reply(`add target message`);
        if (!bot) return m.reply(`add bot message`);

        var mens = parseMention(target);
        var from = m.key.remoteJid; // Menambahkan ini jika from tidak didefinisikan
        var mentioned = parseMention(org); // Menambahkan ini jika mentioned tidak didefinisikan
        var msg1 = { 
            key: { fromMe: false, participant: `${mentioned}`, remoteJid: from ? from : '' }, 
            message: { extendedTextMessage: { text: `${target}`, contextInfo: { mentionedJid: mens } } } 
        };
        var msg2 = { 
            key: { fromMe: false, participant: `${mentioned}`, remoteJid: from ? from : '' }, 
            message: { conversation: `${target}` } 
        };
        conn.sendMessage(from, { text: bot, mentions: mens }, { quoted: mens.length > 2 ? msg1 : msg2 });
        
  } catch (err) {
    console.error('Error:', err);
    await m.reply('Terjadi kesalahan saat membaca atau mengirim pesan.');
  }
}

handler.help = ['tutorial'];
handler.tags = ['info'];
handler.command = /^(fitnah)$/i;

module.exports = handler;

function parseMention(text = '') {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
}