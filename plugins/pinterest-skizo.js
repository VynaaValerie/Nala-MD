let fetch = require('node-fetch');
let axios = require('axios');  // Pastikan mengimport axios

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw 'Cari Apa?';
    if (skizo == "Your_Apikey") throw `APIKEY key belum diisi. Dapatkan APIKEY key gratis atau berbayar di https://skizo.tech dan masukkan ke file setting.js.`
    try {
        let create_image = (await axios.post("https://skizo.tech/api/bing-image", {
            prompt: text,
            cookie: '_C_Auth=;%20_C_Auth=;%20GI_FRE_COOKIE=gi_fre=3;%20ipv6=hit=1716773515134;%20MUID=048A8D6BC41664E9105099E7C523659B;%20_EDGE_V=1;%20MUIDB=048A8D6BC41664E9105099E7C523659B;%20SRCHD=AF=NOFORM;%20SRCHUID=V=2&GUID=EF873B945EC1465E8520EC5B351CA3E7&dmnchg=1;%20_SS=SID=28BDC562A8BC6DCB1B80D1EEA9896C24;%20_clck=i7z8ct%7C2%7Cfm4%7C0%7C1608;%20CSRFCookie=0298e7b9-a99c-41c0-a4f1-cbf6ba62acf4;%20SRCHUSR=DOB=20240527&POEX=W;%20_EDGE_S=SID=3FC9801984D2604E28C59495859761E1;%20ANON=A=4319BC4ED346B91D4DF56C3FFFFFFFFF&E=1dd0&W=1;%20NAP=V=1.9&E=1d76&C=BAm0J_AzG4woXw0dAfeUoVd9uVDRT2IZ4fVGrIThUO1UgHBa1B6faw&W=1;%20PPLState=1;%20KievRPSSecAuth=FACaBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACOHafLzidN6eWASpGKEk760EgpcYOVc'
        }, {
            headers: {
                Authorization: "Ligaa"
            }
        })).data;

        if (!create_image || !create_image.url) throw 'Gagal mengambil gambar';
console.log('hi')
        // Mengirim pesan dengan gambar
      /*  await conn.sendMessage(m.chat, { image: { url: create_image.url }, caption: 'Nih hasilnya' }, { quoted: m });*/
    } catch (e) {
        console.error(e);
        m.reply('Gagal mengambil gambar');
    }
}

handler.help = ['pinterest <text>']
handler.tags = ['internet']
handler.command = /^(bin)$/i
handler.limit = true

module.exports = handler;