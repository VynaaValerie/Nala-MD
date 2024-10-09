let handler = async (m, { conn, text, isOwner }) => {
   
   if (!text) return m.reply('• *Example:* .creategc *[Name group]*')
   try {
    m.reply(wait)
    let group = await conn.groupCreate(text, [m.sender])
    let link = await conn.groupInviteCode(group.gid)
    let url = 'https://chat.whatsapp.com/' + link;
    await conn.groupParticipantsUpdate(ha.gid, [m.sender],"promote"
    m.reply('_Berhasil Membuat Grup *' + text + '*_\n\n*Nama:* ' + text + '\n*ID:* ' + group.gid + '\n*Link:* ' + url)
       } catch (e) {
    let [namagc, partici] = text.split('|')
    if (!namagc) throw 'Format Salah!!!'
    if (!partici) throw 'Tag user sebagai member baru!'
    let mem = conn.parseMention(`@${parseInt(m.sender)} ${partici}`)
    let ha = await conn.groupCreate(namagc, mem).catch(console.error)
    console.log(JSON.stringify(ha));
     conn.groupParticipantsUpdate(ha.gid, [m.sender],"promote") 
  }
}
handler.help = ['creategroup'].map(a => a + " *[name group]*")
handler.tags = ['owner']
handler.command = /^((create|buat)(gc|grup|group))$/
handler.owner = true
handler.group = false
module.exports = handler