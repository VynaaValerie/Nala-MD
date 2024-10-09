let handler = async (m, { conn, args }) => {
    // Mendapatkan daftar pengguna dari database
    let list = Object.entries(global.db.data.users);

    // Mengatur jumlah uang baru (default 100 jika tidak ada argumen)
    let newMoney = !args || !args[0] ? 100 : isNumber(args[0]) ? parseInt(args[0]) : 100;
    newMoney = Math.max(1, newMoney); // Minimal uang adalah 1

    // Memperbarui jumlah uang untuk setiap pengguna dalam daftar
    list.forEach(([user, data], i) => {
        data.money = newMoney;
    });

    // Memberikan balasan ke pengirim bahwa uang telah direset untuk semua pengguna
    conn.reply(m.chat, `*Uang berhasil direset menjadi ${newMoney} untuk setiap pengguna*`, m);
};

// Konfigurasi bantuan, tag, dan perintah handler
handler.help = ['limit'].map(v => 'reset' + v);
handler.tags = ['owner'];
handler.command = /^(resetmoney|risetmoney)$/i;
handler.owner = true; // Hanya bisa digunakan oleh pemilik bot

module.exports = handler;

// Fungsi utilitas untuk memeriksa apakah suatu nilai adalah angka
function isNumber(x = 0) {
    x = parseInt(x);
    return !isNaN(x) && typeof x == 'number';
}