
let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {}
    if (!text) throw `*Example:* ${usedPrefix + command} ${m.sender.split`@`[0]},halo.`;
    let [jid, pesan] = text.split(',');
    if ((!jid || !pesan)) throw `*Example:* ${usedPrefix + command} ${m.sender.split`@`[0]},halo.`;
    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw 'Nomer tidak terdaftar di whatsapp.';
    if (jid == m.sender) throw 'tidak bisa mengirim pesan menfess ke diri sendiri.'
    let mf = Object.values(conn.menfess).find(mf => mf.status === true)
    if (mf) return !0
    	let id = + new Date
        let tek = `*_[ 💬 ] MENFESS CHAT_*\n@${data.jid.split("@")[0]} ada yang ngirim kamu menfess nih\n*=============*\n*Pesan:* ${pesan}\n*=============*\n\n*Silahkan ketik apapun untuk membalas pesan ketik "Stop" untuk mengakhiri sessi menfess*`.trim();

        await conn.reply(data.jid, tek, null)
        .then(() => {
            m.reply('✅ Sukses mengirim pesan ke ' + '@' + data.jid.split("@")[0])
            conn.menfess[id] = {
                id,
                dari: m.sender,
                penerima: data.jid,
                pesan: pesan,
                status: true
            }
            return !0
        })
}
handler.tags = ['main']
handler.help = ['menfess', 'menfes'].map(v => v + ' *[nomor,pesan]*')
handler.command = /^(menfess|menfes|confess)$/i
handler.private = true

module.exports = handler