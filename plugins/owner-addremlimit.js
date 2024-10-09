
let handler = async (m, { conn, usedPrefix, command, text, args }) => {
    if (!text) throw `• *Example:* ${usedPrefix + command} *[@user & limit]*`
 
    let [who, limitValue] = text.split(' ')
    if (!who) throw '*[ ! ] Tag user to Want add Limit'
    if (isNaN(limitValue)) throw '*[ ! ] Only Number*'
  
    limitValue = parseInt(limitValue)
    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users
    if (!users[user]) users[user] = { limit: 0 }  
    if (command === 'addlimit') {  
        users[user].limit += limitValue
        conn.reply(m.chat, `Successfully added ${limitValue} limit for @${user.split('@')[0]}!`, m)
    } else if (command === 'remlimit') {
        if (limitValue > users[user].limit) {
            users[user].limit = 0
            conn.reply(m.chat, `Successfully reduced the limit for @${user.split('@')[0]}. Limit is now 0!`, m)
        } else {
            users[user].limit -= limitValue
            conn.reply(m.chat, `Successfully reduced ${limitValue} limit for @${user.split('@')[0]}!`, m)
        }
    }
}

handler.help = ['addlimit', 'remlimit'].map(a => a + " *[@user & value]*")
handler.tags = ['owner']
handler.command = /^(add|rem)limit$/i
handler.rowner = true

module.exports = handler