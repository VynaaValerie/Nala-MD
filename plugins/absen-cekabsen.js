let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen || {}

    if (!(id in conn.absen)) {
        throw `_*Tidak ada absen berlangsung di grup ini!*_\n\nKetik *${usedPrefix}mulaiabsen* untuk memulai absen`
    }

    let d = new Date()
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })






    let absen = conn.absen[id][1]
    // Membuat teks daftar absen berdasarkan nama yang sudah disimpan
    let list = absen.map((participant, index) => {
        return `│ ${index + 1}. ${participant.name} - @${participant.sender.split('@')[0]}`
    }).join('\n')

    conn.reply(m.chat, `*「 ABSEN 」*\n\nTanggal: ${date}\n\n${conn.absen[id][2]}\n\n┌ *Yang sudah absen:*\n│ \n│ Total: ${absen.length}\n${list}\n│ \n└────\n\n_${global.wm}_`, m)
}

handler.help = ['cekabsen']
handler.tags = ['absen']
handler.command = /^cekabsen$/i
handler.group = true
handler.admin = true
module.exports = handler