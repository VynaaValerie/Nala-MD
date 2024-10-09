
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const streamPipeline = promisify(pipeline);
const os = require('os')
const NeoApi = require('@neoxr/wb');
function trimYouTubeUrl(url) {
  const trimmedUrl = url.split('?')[0];
  return trimmedUrl;
}
const b = new NeoApi();
 
const handler = async (m, { conn, command, text, usedPrefix }) => {
  conn.play = conn.play ? conn.play : {};
  if (!text) throw `*• Example:* ${usedPrefix + command} You are the reason`;
  const key = await conn.sendMessage(m.chat, { text: wait }, { quoted: m });

  try {
    // Validate URL
    let trimmedUrl = trimYouTubeUrl(text);
    let search = await yts(trimmedUrl);
    if (!search) throw 'Not Found, Try Another Title';
    let Func = b.Function;
    let vid = Func.random(search.videos);
    let { title, thumbnail, timestamp, views, ago, url } = vid;
    let caption = `*[ YOUTUBE PLAY ]*\n*• Caption:* ${title}\n*• Views:* ${views}\n*• Ago:* ${ago}\n*• Thumbnail:* ${thumbnail}\n*• Source Yt:* ${url}\n\n*do you want to download the video?*\nType *Y* or *N*\n*• Timeout:* 5 seconds` + "\n\n```Audio will be sent soon\nso please wait a moment```";

    const t = await conn.sendMessage(m.chat, { text: caption, edit: key }, { quoted: key });

    conn.play[m.sender] = {
      url: url,
      reply: t
    }
    const audioStream = ytdl(url, {
    filter: 'audioonly',
    quality: 'highestaudio',
  });

  // Get the path to the system's temporary directory
  const tmpDir = os.tmpdir();

  // Create writable stream in the temporary directory
  const writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);

  // Start the download
  await streamPipeline(audioStream, writableStream);

  let doc = {
    audio: {
      url: `${tmpDir}/${title}.mp3`
    },
    mimetype: 'audio/mp4',
    fileName: `${title}`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: url,
        title: title,
        body: wm,
        sourceUrl: url,
        thumbnail: await (await conn.getFile(thumbnail)).data
      }
    }
  };

  await conn.sendMessage(m.chat, doc, { quoted: t });
setTimeout(() => {
delete conn.play[m.sender]
}, 5000)
  // Delete the audio file
  fs.unlink(`${tmpDir}/${title}.mp3`, (err) => {
    if (err) {
      console.error(`Failed to delete audio file: ${err}`);
    } else {
      console.log(`Deleted audio file: ${tmpDir}/${title}.mp3`);
    }
  });
  } catch (error) {
    m.reply(error);
    throw error;
  }
};

handler.before = async (m, { conn }) => {
  conn.play = conn.play ? conn.play : {};
  if (!m.text) return;
  if (!conn.play[m.sender]) return;
  if (m.text == "Y") {
    m.reply(wait);
    let { url, reply } = conn.play[m.sender];
    let video = await Scraper.Other.ytPlayMp4(url);
    await conn.sendMessage(m.chat, { video: { url: video.url }, caption: `*✅ Succes Download videos*` }, { quoted: reply });
    delete conn.play[m.sender];
  } else if (m.text == "N") {
    m.reply("*✅ Succes canceled videos*");
    delete conn.play[m.sender];
  } else return;
};

handler.help = ['play'].map((v) => v + ' *[query]*');
handler.tags = ['downloader'];
handler.command = /^(play)$/i;

module.exports = handler;