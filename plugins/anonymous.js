async function handler(m, { command }) {
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) throw '*[ ! ] You are not in anonymous chat*'
            m.reply('*[ ✓ ] Success Left from anonymous chat*')
            let other = room.other(m.sender)
            if (other) conn.sendMessage(other,{text: '*[ ! ] Partner left chat*'},{quoted:m})
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) throw '*[ ! ] You are still in anonymous chat*'
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                conn.reply(room.b,'*[ ✓ ] Finding a partner*',m)
                room.b = m.sender
                room.state = 'CHATTING'
                conn.reply(room.b,'*[ ✓ ] Finding a partner*',m)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                m.reply('*[ ! ] Waiting for anonymous chat parter...*')
            }
            break
        }
    }
}
handler.help = ['start *[start sessions]*', 'leave *[end sessions]*', 'next *[next panther]*']
handler.tags = ["anonymous"]
handler.command = ['start', 'leave', 'next']
handler.private = true

module.exports = handler