const {
    Prodia
} = require('prodia.js');
const apiKey = "df165bab-9893-4f02-92bf-e8b09592b43a";
const prodia = new Prodia(apiKey);

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    const input_data = await prodia.getSDmodels();

    let [urutan, tema] = text.split("|")
    if (!tema) return m.reply("Input query!\n*Example:*\n.txt2img [nomor]|[query]")

    await m.reply(wait)
    try {
        let data = input_data.map((item, index) => ({
            title: item.replace(/[_-]/g, ' ').replace(/\..*/, ''),
            id: item
        }));
        if (!urutan) return  m.reply("*• Example:*\n.txt2img [nomor]|[query]\n\n*[ LIST MODEL ]*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (isNaN(urutan)) return m.reply("*• Example:*\n.txt2img [nomor]|[query]\n\n*[ LIST MODEL ]*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (urutan > data.length) return m.reply("*• Example:*\n.txt2img [nomor]|[query]\n\n*[ LIST MODEL ]*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        let out = data[urutan - 1].id

        const generateImageParams = {
            prompt: encodeURIComponent(tema),
            model: out,
            sampler: "DPM++ SDE Karras",
            cfg_scale: 9,
            steps: 30,
            aspect_ratio: "portrait"
        };
        const openAIResponse = await generateImage(generateImageParams);

        if (openAIResponse) {
            const result = openAIResponse;
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: result.imageUrl
                },
                caption: `*Text to generate image*\n*• Model:* ${out}\n*• Prompt:* ${tema}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        } else {
            console.log("There is no respons an error occurred.");
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["txt2img *[model|prompt]*"]
handler.tags = ["ai"]
handler.command = /^(txt2img)$/i
handler.premium = true
module.exports = handler

async function generateImage(params) {
    const generate = await prodia.generateImage(params);

    while (generate.status !== "succeeded" && generate.status !== "failed") {
        await new Promise((resolve) => setTimeout(resolve, 250));

        const job = await prodia.getJob(generate.job);

        if (job.status === "succeeded") {
            return job;
        }
    }
}