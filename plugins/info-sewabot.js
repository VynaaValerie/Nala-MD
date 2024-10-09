
let handler = async (m, { conn }) => {
let capt = `*
╔═════════════════❑
║     🤖 *LIST SEWA BOT* 🤖
╟─────────────────
║ 📅  1 Minggu : Rp.3.000
║ 📅  2 Minggu : Rp.6.000
║ 📅  3 Minggu : Rp.8.000
║ 📅  1 Bulan  : Rp.12.000
╚═════════════════❏
🛠️ *Sewa bot bisa memasukkan bot ke grup dan mendapatkan premium sehingga bisa mengakses fitur premium di bot.*

📲 *Pembayaran?*
- *Dana:* Chat ketik [ .owner ]
- *Via pulsa:* tambahkan 3k [ Lebih mahal sedikit ]
_Chat ketik_ *[ .owner ]* _untuk membeli fitur premium_
`;

conn.sendMessage(m.chat, {
      text: capt,
      contextInfo: {
      externalAdReply: {
      showAdAttribution: true,
      title: `• List Harga Sewa ${namebot}`,
      body: author,
      thumbnailUrl: icon,
      sourceUrl: sgc,
      mediaType: 1,
      renderLargerThumbnail: true
      }}}, { quoted: m })
}
handler.help = ['sewabot']
handler.tags = ['info']
handler.command = /^(rental|iklan|sewa|sewabot)$/i

module.exports = handler