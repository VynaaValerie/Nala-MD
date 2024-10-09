const similarity = require('similarity');
const threshold = 0.72;

const before = async (m, { conn }) => {
    let id = m.chat;
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hgam/i.test(m.quoted.text) || /.*hgam/i.test(m.text)) {
        return true;
    }
    conn.tebakingambar = conn.tebakingambar ? conn.tebakingambar : {};
    if (!(id in conn.tebakingambar)) {

    }
    if (m.quoted.id == conn.tebakingambar[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
        if (isSurrender) {
            clearTimeout(conn.tebakingambar[id][3]);
            delete conn.tebakingambar[id];
            return m.reply('*Yah Menyerah :( !*');
        }
        let json = JSON.parse(JSON.stringify(conn.tebakingambar[id][1]));
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += conn.tebakingambar[id][2];
            global.db.data.users[m.sender].money += conn.tebakingambar[id][4];
            m.reply(`*Benar!*\n+${conn.tebakingambar[id][2]} XP
$${conn.tebakingambar[id][4]} Money`);
            clearTimeout(conn.tebakingambar[id][3]);
            delete conn.tebakingambar[id];
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit Lagi!*`);
        } else {
            m.reply(`*Salah!*`);
        }
    }
    return true;
};

const exp = 0;

module.exports = { before, exp }