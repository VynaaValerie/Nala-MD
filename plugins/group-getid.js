let handler = async (m, {conn, groupMetadata }) => {
conn.reply(m.chat, `${await groupMetadata.id}`, m)
}
handler.help = ['getid'].map(a => a + ' *[get id group]*')
handler.tags = ['group']
handler.command = /^(getid|idgc|gcid)$/i

handler.restrict = true

module.exports = handler