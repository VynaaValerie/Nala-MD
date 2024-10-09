const similarity = require('similarity');
const threshold = 0.72;

const before = async (m, { conn }) => {
    let id = m.chat;
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*teka/i.test(m.quoted.text) || /.*(hint|teka)/i.test(m.text)) {
        return true;
    }
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {};
    if (!(id in conn.tebakkata)) {
        return conn.reply(m.chat, 'Soal itu telah berakhir', m);
    }
    if (m.quoted.id == conn.tebakkata[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
        if (isSurrender) {
            clearTimeout(conn.tebakkata[id][3]);
            delete conn.tebakkata[id];
            return m.reply('*Yah Menyerah :( !*');
        }
        let json = JSON.parse(JSON.stringify(conn.tebakkata[id][1]));
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += conn.tebakkata[id][2];
            global.db.data.users[m.sender].money += conn.tebakkata[id][4];
            m.reply(`*Benar!*\n+${conn.tebakkata[id][2]} XP
$${conn.tebakkata[id][4]} Money`);
            clearTimeout(conn.tebakkata[id][3]);
            delete conn.tebakkata[id];
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit Lagi!*`);
        } else {
            m.reply(`*Salah!*`);
        }
    }
    return true;
};

const exp = 0;

module.exports = { before, exp };