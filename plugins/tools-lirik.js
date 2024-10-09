let fetch = require('node-fetch')

let handler = async (m, { text }) => {
    if (!text) throw '*Contoh:* .lirik *[Judul Lagu]*'
    let res = await fetch(`https://some-random-api.com/others/lyrics?title=${encodeURIComponent(text)}`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
    let result = `Judul: ${json.title}\nArtis: ${json.author}\n\n${json.lyrics}`
    m.reply(result)
}

handler.help = ['lirik *[Judul Lagu]*']
handler.tags = ['tools']
handler.command = /^(lirik)$/i

module.exports = handler