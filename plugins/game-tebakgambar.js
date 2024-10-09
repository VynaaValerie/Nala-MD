const { tebakgambar } = require('@bochilteam/scraper');

let timeout = 120000;
let poin = 500;
let money = 5
const handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakingambar = conn.tebakingambar ? conn.tebakingambar : {};
    let id = m.chat;
    if (id in conn.tebakingambar) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakingambar[id][0]);
        throw false;
    }
    let json = await tebakgambar();
    let caption = `*${command.toUpperCase()}*
Rangkailah Gambar Ini
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hgam untuk bantuan
Bonus: 
${poin} XP
$${money} Money
    `.trim();
    conn.tebakingambar[id] = [
        await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption }, { quoted: m }),
        json, poin,
        setTimeout(() => {
            if (conn.tebakingambar[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakingambar[id][0]);
            delete conn.tebakingambar[id];
        }, timeout), money
    ];
};
handler.help = ['tebakgambar'];
handler.tags = ['game'];
handler.command = /^tebakgambar/i;

module.exports = handler