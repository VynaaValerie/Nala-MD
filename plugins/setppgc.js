let { createRequire } = require('module');

const jimp_1 = require('jimp')

let handler = async (m, { conn, command, usedPrefix }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		try {
			let media = await q.download()
			let { img } = await pepe(media)
			await conn.query({
				tag: 'iq',
				attrs: {
					to: m.chat,
					type:'set',
					xmlns: 'w:profile:picture'
				},
				content: [
					{
						tag: 'picture',
						attrs: { type: 'image' },
						content: img
					}
				]
			})
			m.reply(`Admin @${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')} has replaced the group icon!`, null, { mentions: [m.sender] })
		} catch (e) {
			console.log(e)
			m.reply(eror)
		}
	} else {
		m.reply(`*• Example:* ${usedPrefix + command} *[reply/send media]*`)
	}
}

handler.help = ['setppgroup'].map(a => a + ' *[reply/send media]*')
handler.tags = ['group']

handler.command = /^(setppgroup|setppgrup|setppgc|setppg)$/i


handler.admin = true
handler.botAdmin = true
handler.group = true

module.exports = handler

async function pepe(media) {
	const jimp = await jimp_1.read(media)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
		preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG)
	}
}1