let handler = async (m, { conn }) => {
    conn.tebakingambar = conn.tebakingambar ? conn.tebakingambar : {}
    let id = m.chat
    if (!(id in conn.tebakingambar)) throw false
    let json = conn.tebakingambar[id][1]
    conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^hgam$/i

handler.limit = true

module.exports = handler