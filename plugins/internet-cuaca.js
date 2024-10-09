
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `• *Example:* ${usedPrefix + command} Jakarta`
    m.reply(wait)
    let res = await fetch(API('https://api.openweathermap.org', '/data/2.5/weather', {
        q: text,
        units: 'metric',
        appid: '060a6bcfa19809c2cd4d97a212b19273'
    }))
    if (!res.ok) throw 'location not found'
    let json = await res.json()
    if (json.cod != 200) throw json
    m.reply(`
Location: ${json.name}
Country: ${json.sys.country}
Weather: ${json.weather[0].description}
Current temperature: ${json.main.temp} °C
Highest temperature: ${json.main.temp_max} °C
Lowest temperature: ${json.main.temp_min}
    `.trim())
}

handler.help = ['cuaca *[name city]*']
handler.tags = ['internet']
handler.command = /^(cuaca|weather)$/i
handler.limit = true

module.exports = handler