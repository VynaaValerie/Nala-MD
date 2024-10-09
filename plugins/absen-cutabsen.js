let handler = async (m, { usedPrefix, command, text }) => {
    let id = m.chat
    conn.absen = conn.absen || {}
   if (!text) return m.reply(`Contoh: ${usedPrefix}${command} (nama yang ada dalam absen)`)
    if (!(id in conn.absen)) {
        throw `_*Tidak ada absen berlangsung di grup ini!*_\n\nKetik *${usedPrefix}mulaiabsen* untuk memulai absen`
    }

    let absen = conn.absen[id][1]

    // Pisahkan nama yang ingin dihapus dari teks input
    let nameToRemove = text.trim()

    // Temukan indeks entri dalam daftar absen yang memiliki nama yang sesuai
    let indexToRemove = absen.findIndex(participant => participant.name === nameToRemove)

    if (indexToRemove !== -1) {
        // Nama ditemukan dalam daftar absen, hapus entri bersama dengan nomor urutannya
        let removedEntry = absen.splice(indexToRemove, 1)[0] // Menghapus dan menyimpan entri yang dihapus
        m.reply(`Nama ${nameToRemove} (nomor ${indexToRemove + 1}) berhasil dihapus dari daftar absen.`)
    } else {
        // Nama tidak ditemukan dalam daftar absen
        m.reply(`Nama ${nameToRemove} tidak ditemukan dalam daftar absen.`)
    }
}

handler.help = ['cutabsen [nama]']
handler.tags = ['absen']
handler.command = /^(rmabsen|cutabsen|cabsen)$/i
handler.group = true

module.exports = handler