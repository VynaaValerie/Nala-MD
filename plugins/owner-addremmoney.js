let handler = async (m, { conn, usedPrefix, command, text, args }) => {
    if (!text) throw `• *Example:* ${usedPrefix + command} *[@user & value]*`
 
    let [who, moneyValue] = text.split(' ')
    if (!who) throw '*[ ! ] Tag user to add or remove money*'
    if (isNaN(moneyValue)) throw '*[ ! ] Only Number*'
  
    moneyValue = parseInt(moneyValue)
    const MAX_MONEY = 100000000000000000000000; // Set a maximum limit for money
    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users
    if (!users[user]) users[user] = { money: 0 }  

    if (command === 'addmoney') {  
        users[user].money += moneyValue
        if (users[user].money > MAX_MONEY) {
            users[user].money = MAX_MONEY
        }
        conn.reply(m.chat, `Successfully added ${moneyValue} money for @${user.split('@')[0]}! Total money: ${users[user].money}`, m)
    } else if (command === 'remmoney') {
        if (moneyValue > users[user].money) {
            users[user].money = 0
            conn.reply(m.chat, `Successfully reduced the money for @${user.split('@')[0]}. Money is now 0!`, m)
        } else {
            users[user].money -= moneyValue
            conn.reply(m.chat, `Successfully reduced ${moneyValue} money for @${user.split('@')[0]}! Total money: ${users[user].money}`, m)
        }
    }
}
handler.help = ['addmoney', 'remmoney'].map(a => a + " *[@user & value]*")
handler.tags = ['owner']
handler.command = /^(addmoney|remmoney)$/i
handler.rowner = true

module.exports = handler