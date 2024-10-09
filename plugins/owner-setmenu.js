
let handler = async (m, {conn, text}) => {
global.menu = text
if (text === 'simple') {
m.reply('Suksess Set menu menjadi simple ✅')
} else if (text === 'gif') {
m.reply('sukses set menu menjadi gif ✅')
} else if (text === 'payment') {
m.reply('sukses set menu menjadi payment ✅')
} else if (text === 'edit') {
m.reply('sukses set menu menjadi pesan edit  ✅')
} else if (text === 'tags') {
m.reply('sukses set menu menjadi pesan edit  ✅')
} else m.reply('Menu berhasil di reset‼️\n\n===========================\n*•BERIKUT LIST TAMPILAN MENU*\n• simple : menampilkan menu dengan simpleMenu\n• gif : menampilkan menu dengan Gif\n• payment :  menampilkan menu dengan RequestPaymentMessage\n=========================\n\n*Example:* .setmenu doc')
}
handler.command = handler.help = ['setmenu']
handler.tags = ['owner']
handler.rowner = true
module.exports = handler