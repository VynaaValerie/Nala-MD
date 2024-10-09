
const fs = require('fs');
const path = require('path');

const handler = async (m, { conn }) => {
  const directory = './session';

  function deleteFilesExceptOne(directory, fileNameToKeep) {
    fs.readdir(directory, (err, files) => {
      if (err) {
        console.error('Terjadi kesalahan:', err);
        return;
      }
      files.forEach((file) => {
        const filePath = path.join(directory, file);
        if (file !== fileNameToKeep) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Gagal menghapus file ${file}:`, err);
            } else {
              console.log(`File ${file} berhasil dihapus.`);
            }
          });
        }
      });

      m.reply(`Berhasil menghapus file di folder *session* ✅`);
    });
  }

  deleteFilesExceptOne(directory, 'creds.json');
};

handler.command = handler.help = ['csessi', 'clearsessi'];
handler.tags = ['owner'];
handler.rowner = true;

module.exports = handler;