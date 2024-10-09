let fetch = require('node-fetch')

let handler = async (m, { text }) => {
    if (!text) throw '*Contoh:* .lirik *[Judul Lagu]*'
    let res = await fetch(`https://some-random-api.com/chatbot?message=${text}&key=a3JleQ==.cKRPf7.8T1zXZPtnlsuHx72thDyW4JlV9g`)
    if (!res.ok) throw await res.text()
    let json = await res.json()
m.reply(json.response)
}
handler.help = ['enai *[query english only]*']
handler.tags = ['ai']
handler.command = /^(enai)$/i

module.exports = handler