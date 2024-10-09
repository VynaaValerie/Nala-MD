let scrap = require("../lib/scraper_pinterest")
let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
	  if (!text) throw `Cari Apa?`
	m.reply('_*Mohon Tunggu Sebentar*_') 
	  scrap.pinterest(text)
      .then(a => a[Math.floor(Math.random() * a.length)])
       .then(b => conn.sendFile(m.chat,b,b,"*── 『 PINTEREST 』 ──*\n\nHasil Pencarian\n" + text, m)
    )}
    
handler.help = ['pinterest <text>']
handler.tags = ['internet']
handler.command = /^(pin|pinterest)$/i
handler.limit = true

module.exports = handler