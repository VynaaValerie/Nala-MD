const axios = require('axios');

let handler = async (m, { conn, text }) => {
    if (!text) throw `*• Example:* .autoai *[on/off]*`;

    
        let name = conn.getName(m.sender);
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
        try {
            const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
                messages: [
                    { role: "system", content: `Kamu adalah Kreybot, dan developer kamu adalah Kreyuk, lawan bicarmu bernama ${name}` },
                    { role: "user", content: text }
                ]
            });

            const hasil = response.data;
            
            m.reply(hasil.answer);
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }

handler.command = ['openai', 'gpt', 'ai'];
handler.tags = ["ai"]
handler.help = ['ai', 'gpt', 'openai'].map(a => a + " *[text]*");

module.exports = handler;