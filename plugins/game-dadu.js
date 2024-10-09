
let handler = async (m, { conn }) => {
    try {
        const diceValue = Math.floor(Math.random() * 6) + 1;
        const diceImage = rollDice(diceValue);
        const isHighRoll = diceValue >= 4;
        const additionalCoins = diceValue === 3 ? 300 : diceValue * 1;
        const baseCoins = isHighRoll ? Math.min(Math.floor(Math.random() * 1), 1) : 0;
        const baseExp = isHighRoll ? Math.min(Math.floor(Math.random() * 1), 1) : 0;
        const multiplier = isHighRoll ? Math.floor(Math.random() * 2) + 1 : 1;
        const coins = Math.min(baseCoins * multiplier + additionalCoins, 20);
        const exp = Math.min(baseExp * multiplier, 100);
        const player = global.db.data.users[m.sender];
        player.money += coins;
        player.exp += exp;

        const coinMessage = coins ? `💰 *$${coins.toLocaleString()}* money earned!` : 'No money earned.';
        const expMessage = exp ? `🌟 *${exp.toLocaleString()}* exp gained!` : 'No exp gained.';
        const additionalCoinsMessage = additionalCoins ? `💰 Additional *${additionalCoins.toLocaleString()}* money for rolling a ${diceValue}!` : '';
        const multiplierMessage = multiplier > 1 ? `Multiplier: *${multiplier}*` : '';

        const msg = `${coinMessage}\n${expMessage}\n${additionalCoinsMessage}\n${multiplierMessage}`;
        await conn.reply(m.chat, msg, m, {
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: "🎲 Roll the dice!",
                    thumbnail: await (await conn.getFile(diceImage)).data
                },
            },
        });
    } catch (error) {
        console.error(error);
        await m.reply("Error processing the dice roll.");
    }
};

handler.help = ["dadu"].map(a=> a + ' *[Rolling dice]*');
handler.tags = ["game"];
handler.command = ["dadu"];
module.exports = handler;

function rollDice(value) {
    return `https://www.random.org/dice/dice${value}.png`;
}