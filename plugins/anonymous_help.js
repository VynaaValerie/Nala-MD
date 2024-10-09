let handler = async (m, { conn }) => {
let anu = `*[ A N O N Y M O U S   C H A T ]*
*• Guide:*
Anonymous chat is a form of online chat where the user's identity remains confidential. In anonymous chat, users do not need to provide personal information such as name, address, or telephone number. It allows users to communicate anonymously with unknown people in an online environment. Anonymous chat is often used to share stories, get advice, or just chat with people from various parts of the world without fear of judgment or identity disclosure.
 
*[ COMMAND ]*
.start *[start anonymous]*
.leave *[End anonymous]*
.next *[Get next panther]*`

m.reply(anu)
}
 handler.help = ['anonymous'].map(a => a + " *[guide of AM]*")
handler.tags = ['anonymous']
handler.command = ["anonymous"]
module.exports = handler