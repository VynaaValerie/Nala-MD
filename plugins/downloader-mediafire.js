
let { mediafiredl } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*• example:* ${usedPrefix}${command} https://www.mediafire.com/xxx`
    let res = await mediafiredl(args[0])
    let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
    let caption = `
*💌 Name:* ${filename}
*📊 Size:* ${filesizeH}
*🗂️ Extension:* ${ext}
*📨 Uploaded:* ${aploud}
`
    m.reply(caption)
    await conn.sendMessage(m.chat, { document: { url: url }, fileName: filename }, { mimetype: ext })
}
handler.help = ['mediafire'].map(v => v + ' *[url MediaFire]*')
handler.tags = ['downloader']
handler.command = /^(mediafire|mf)$/i

module.exports = handler