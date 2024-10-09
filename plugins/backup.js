const fs = require('fs');
const path = require('path');

const databasePath = path.join(__dirname, '../database.json');

// Fungsi untuk membaca file JSON dan mengembalikan data sebagai string
const readDatabase = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(databasePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

let handler = async (m, { conn }) => {
  try {
    // Baca isi database.json
    const data = await readDatabase();
    
    // Simpan data ke dalam file sementara
    const tempFilePath = path.join(__dirname, '../tempDatabase.json');
    fs.writeFileSync(tempFilePath, data, 'utf8');
    
    // Kirim file yang berisi data dari database.json
    await conn.sendFile(m.chat, tempFilePath, 'database.json', 'Berikut adalah isi dari database.json:', m);
    
    // Hapus file sementara setelah pengiriman
    fs.unlinkSync(tempFilePath);
  } catch (err) {
    console.error('Error:', err);
    await m.reply('Terjadi kesalahan saat membaca atau mengirim file.');
  }
};

handler.help = ['backup'];
handler.tags = ['info'];
handler.command = /^(backup)$/i;

module.exports = handler;