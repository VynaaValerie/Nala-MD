const { createReadStream, promises, ReadStream } = require('fs');
const { join } = require('path');
const { spawn } = require('child_process');
const { Readable } = require('stream');
const Helper = require('./helper.js');

const __dirname = Helper.__dirname(require.main.filename);

/**
 * @param {Buffer | Readable} buffer 
 * @param {string[]} args 
 * @param {string} ext 
 * @param {string} ext2 
 * @returns {Promise<{
 *  data: ReadStream; 
 *  filename: string; 
 *  toBuffer: () => Promise<Buffer>;
 *  clear: () => Promise<void>;
 * }>}
 */
function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
    return new Promise(async (resolve, reject) => {
        try {
            const tmp = join(__dirname, `../tmp/${Date.now()}.${ext}`);
            const out = `${tmp}.${ext2}`;

            const isStream = Helper.isReadableStream(buffer);
            if (isStream) await Helper.saveStreamToFile(buffer, tmp);
            else await promises.writeFile(tmp, buffer);

            spawn('ffmpeg', [
                '-y',
                '-i', tmp,
                ...args,
                out
            ])
                .once('error', reject)
                .once('close', async (code) => {
                    try {
                        await promises.unlink(tmp);
                        if (code !== 0) return reject(code);
                        const data = createReadStream(out);
                        resolve({
                            data,
                            filename: out,
                            async toBuffer() {
                                const buffers = [];
                                for await (const chunk of data) buffers.push(chunk);
                                return Buffer.concat(buffers);
                            },
                            async clear() {
                                data.destroy();
                                await promises.unlink(out);
                            }
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 * @returns {ReturnType<typeof ffmpeg>}
 */
function toAudio(buffer, ext) {
    return ffmpeg(buffer, [
        '-vn',
        '-c:a', 'libmp3lame',
        '-b:a', '128k'
    ], ext, 'mp3');
}

/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension 
 * @returns {ReturnType<typeof ffmpeg>}
 */
function toVideo(buffer, ext) {
    return ffmpeg(buffer, [
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-ab', '128k',
        '-ar', '44100',
        '-crf', '32',
        '-preset', 'slow'
    ], ext, 'mp4');
}

module.exports = {
    toAudio,
    toVideo,
    ffmpeg
};