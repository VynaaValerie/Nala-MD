let handler = async (m, { usedPrefix, text, command }) => {
    
    if (!text) return m.reply(`Example: .${command} nama`)
    let id = m.chat
    conn.absen = conn.absen || {}

    if (!(id in conn.absen)) {
        throw `_*Tidak ada absen berlangsung di grup ini!*_\n\nKetik *${usedPrefix}mulaiabsen* untuk memulai absen`
    }

    let absen = conn.absen[id][1]
    let senderId = m.sender

    // Pisahkan nama dari teks input menggunakan koma sebagai pemisah
    let names = text.split(',').map(name => name.trim())

    // Tambahkan setiap nama ke dalam daftar absen bersama ID pengirim pesan
    names.forEach(name => {
        absen.push({ sender: senderId, name }) // Simpan objek dengan ID pengirim dan nama
    })
    let d = new Date()
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    // Membuat teks daftar absen berdasarkan nama yang sudah disimpan
    let list = absen.map((participant, index) => {
        return `│ ${index + 1}. ${participant.name} - @${participant.sender.split('@')[0]}`
    }).join('\n')

    conn.reply(m.chat, `*「 ABSEN 」*\n\nTanggal: ${date}\n\n${conn.absen[id][2]}\n\n┌ *Yang sudah absen:*\n│ \n│ Total: ${absen.length}\n${list}\n│ \n└────\n\n_${global.wm}_`, m)
}

handler.help = ['absen nama']
handler.tags = ['absen']
handler.command = /^(absen|hadir)$/i
handler.group = true

module.exports = handler