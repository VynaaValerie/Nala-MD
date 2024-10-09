const fetch = require('node-fetch');
let lastUsed = 0;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Contoh:* ${usedPrefix + command} blue sky`;

  let currentTime = Date.now();
  if (currentTime - lastUsed < 10000) throw "Cooldown 10 detik coba lagi nanti";

  lastUsed = currentTime;

  try {
    let negative = 'ugly, deformed, noisy, blurry, distorted, out of focus, bad anatomy, extra limbs, poorly drawn face, poorly drawn hands, missing fingers, adult, naked, 18+';
    let gpt = await (await fetch(`https://itzpire.site/ai/${command}?prompt=${text}`)).json();
    m.reply(wait)
    conn.sendMessage(m.chat, {image: { url: gpt.result}, caption: text}, {quoted: m});
  } catch(e) {
    throw "`*GPT Tidak Merespons*`";
  }
}

handler.help = ['realistic', '3dmodel'].map(a => a + " *[prompt]*");
handler.tags = ["ai"];
handler.command = ['realistic', 'render3d', '3dcartoon', '3dmodel'];
handler.premium = true
module.exports = handler;