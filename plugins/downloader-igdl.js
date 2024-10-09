const { igdl, igdl2 } = require('../lib/igdl.js');

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!/https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)/i.test(args[0])) throw `Use example ${usedPrefix}${command} link`;
    try {
        m.reply(wait);
        const res = await igdl(args[0]);
        const url = res.data[0];
        conn.sendMessage(m.chat, {video: { url: url}, caption : 'Nih'}, {quoted: m});
    } catch (e) {
        console.log(e);
        throw e;
    }
};

handler.help = ['ig'];
handler.tags = ['downloader'];
handler.command = /^(ig(dl)?|insta|instagram(dl)?)$/i;

module.exports = handler;