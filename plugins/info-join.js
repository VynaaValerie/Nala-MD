const cooldown = 86400000 // 1 day in milliseconds

let handler = async (m, { conn, text, isOwner }) => {
    // Memisahkan teks menjadi bagian link dan hari
    let parts = text.split(' ')
    if (parts.length < 2) throw 'Format salah. Gunakan: join <link> <hari>'
    
    let link = parts[0]
    let days = parts[1]
    
    // Memeriksa apakah link valid
    let codeMatch = link.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/)
    if (!codeMatch) throw 'Link invalid'
    let code = codeMatch[1]
    
    // Memeriksa apakah hari adalah angka
    if (!isNumber(days)) throw 'Jumlah hari harus berupa angka'
    let expiredDays = parseInt(days)
    if (expiredDays <= 0) throw 'Jumlah hari harus lebih dari 0'
    
    // Batasan hari untuk pengguna biasa dan owner
    if (!isOwner) expiredDays = Math.min(3, expiredDays)
    expiredDays = Math.min(999, expiredDays)
    
    try {
        // Bergabung dengan grup menggunakan kode undangan
        const res = await conn.groupAcceptInvite(code)
        let groupInfo = await conn.groupGetInviteInfo(code)
        
        m.reply(`Berhasil join grup ${groupInfo.subject} selama ${expiredDays} hari`)
        
        // Menentukan id untuk penyimpanan data
        let id = m.isGroup ? m.chat : groupInfo.id
        
        // Menyimpan informasi grup dan waktu kedaluwarsa
        let chats = global.db.data.chats[id] || {}
        chats.expired = +new Date() + expiredDays * cooldown
        chats.joindate = new Date().getTime()
        chats.joincd = expiredDays * cooldown
        global.db.data.chats[id] = chats
        
        // Mengatur pemeriksaan periodik
        scheduleCheck(conn)
        
    } catch (e) {
        console.log(e)
        throw 'Link expired / bot sudah di kick sebelumnya.'
    }
}

handler.help = ['join <link> <hari>']
handler.tags = ['info']
handler.command = /^join14$/i
handler.premium = true

module.exports = handler

const isNumber = (x) => {
    let num = parseInt(x)
    return !isNaN(num) && typeof num === 'number'
}

// Fungsi untuk memeriksa grup yang telah kedaluwarsa
const scheduleCheck = (conn) => {
    setInterval(async () => {
        let now = +new Date()
        for (let id in global.db.data.chats) {
            let chat = global.db.data.chats[id]
            if (chat.expired && now > chat.expired) {
                try {
                    await conn.groupLeave(id)
                    delete global.db.data.chats[id]
                    console.log(`Bot has left the group ${id}`)
                } catch (e) {
                    console.log(`Failed to leave group ${id}:`, e)
                }
            }
        }
    }, cooldown) // Check every day
}