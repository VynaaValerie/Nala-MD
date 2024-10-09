async function handler(m) {
    if (!m.quoted) throw '*[ ! ] Reply a message*'
    let q = await this.serializeM(await m.getQuotedObj())
    if (!q.quoted) throw `*[ x ] i can't get Forward this message*`
    await q.quoted.copyNForward(m.chat, true)
}
handler.help = ['q'].map(a => a + ' *[reply message]*')
handler.tags = ['tools']
handler.command = /^q$/i
handler.limit = true
module.exports = handler
