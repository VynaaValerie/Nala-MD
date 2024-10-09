const { Primbon } = require('scrape-primbon');
const primbon = new Primbon();

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let anu;
        switch (command) {
            case 'artimimpi': {
                if (!text) throw `*Contoh:* ${usedPrefix + command} belanja`;
                anu = await primbon.tafsir_mimpi(text);
                
                conn.sendText(m.chat, `⭔ *Mimpi :* ${anu.message.mimpi}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Solusi :* ${anu.message.solusi}`);
                break;
            }
            case 'ramalanjodoh':
            case 'ramaljodoh': {
                if (!text) throw `Contoh : ${usedPrefix + command} Ujang, 7, 7, 2005, Putri, 16, 11, 2004`;
                let [nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2] = text.split `,`;
                anu = await primbon.ramalan_jodoh(nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2);
            
                conn.sendText(m.chat, `⭔ *Nama Anda :* ${anu.message.nama_anda.nama}\n⭔ *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n⭔ *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n⭔ *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n⭔ *Hasil :* ${anu.message.result}\n⭔ *Catatan :* ${anu.message.catatan}`);
                break;
            }
            case 'artinama': {
                if (!text) throw `Contoh : ${usedPrefix + command} krey`;
                anu = await primbon.arti_nama(text);
               
                conn.sendText(m.chat, `⭔ *Nama :* ${anu.message.nama}\n⭔ *Arti :* ${anu.message.arti}\n⭔ *Catatan :* ${anu.message.catatan}`);       
                break;
            }
            default:
                throw "Perintah tidak ditemukan";
        }

        if (!anu || anu.status === undefined) throw "Hasil tidak ditemukan atau tidak valid";

    } catch(e) {
        throw `*Error:* ${e}`;
    }
}

handler.help = ["artimimpi", "ramalanjodoh", "ramaljodoh", "artinama"];
handler.tags = ['primbon'];
handler.command = ["artimimpi", "tafsirmimpi", "ramalanjodoh", "ramaljodoh", "artinama"];
module.exports = handler;