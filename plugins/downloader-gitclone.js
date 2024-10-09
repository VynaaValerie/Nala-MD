
async function isUrl(url) {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
let handler = async (m, {conn, text, args, usedPrefix, command }) => {
	if (!text) throw `*• Example:* ${usedPrefix + command} *[url github]*`
    m.reply(wait)
    if (!isUrl(args[0]) && !args[0].includes('github.com')) return m.reply(`*[ ! ] invalid url github*`)
	let [, user, repo] = args[0].match(regex) || []
	repo = repo.replace(/.git$/, '')
				let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let name = `${encodeURIComponent(repo)}.zip`
    conn.sendMessage(m.chat,{document: { url: url },fileName: name, caption: `*[ ✓ ] Result from:* ${text}`},{ quoted: m})
}
handler.help = ['gitclone'].map(a => a + " *[url github]*")
handler.tags = ['downloader']
handler.command = /gitclone/i

handler.limit = true
handler.register = true

module.exports = handler