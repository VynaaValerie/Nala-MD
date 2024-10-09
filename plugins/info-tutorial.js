
let handler = async (m, { conn }) => {
	let rules = `Tutorial Penggunaan Bot :

1. Semua Fitur Bot Menggunakan Prefix Yaitu Harus Menggunakan Titik (.) Di Awal Perintah Agar Perintahnya Aktif.
Contoh: Ketik .menu all

2. Jika Kamu Ingin Mencari Sesuatu Kamu Bisa Lihat Di List Menu Internet, Kamu Bisa Menemukan Seperti Tiktok search.
Contoh Penggunaan: Ketik .tiktoks Trending hari ini

3. Jika Ingin Mendownload Seperti Video, Reels Fb/Ig, Story Ig, Dan Lain Sebagainya Kamu Bisa Melihat Di List Menu .menu downloader.
Contoh Penggunaan: Ketik .instagram https://www.instagram.com/reel/****

4. Jika Ingin Mengubah Ataupun Menggunakan Fitur Yang Berhubungan Dengan Media Seperti Audio, Foto, Dan Video Kamu Harus Balas Chatnya Dan Ketik Perintahnya 
Contoh Penggunaan: Balas/Reply Vn Nya Terus Ketik .tomp3

5. Jika Kamu Kehabisan Limit Kamu Bisa Membelinya Dengan Cara Mengetik .beli limit 1. Kamu Tidak Punya Koin?, Kamu Bisa Memainkan Game Yang Ada Di Menu HaveFun, Jika Kamu Bisa Menjawab/Memenangkan Game Tersebut, Kamu Akan Mendapatkan Exp, Koin, Dan Limit.

_Note: Jika Masih Tidak Mengerti Hubungin Owner Dengan Cara Mengetik .owner_
`;
	await conn.sendFile(m.chat, icon, 'anu.jpg', rules, m)
}
handler.help = ['tutorial']
handler.tags = ['info']
handler.command = /^(tutorial)$/i;

module.exports = handler;