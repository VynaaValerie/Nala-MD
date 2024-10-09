const axios = require('axios');
const fetch = require('node-fetch');
const formData = require('form-data');
const cheerio = require('cheerio');

async function igdl(url) {
    try {
        const resp = await axios.post("https://saveig.app/api/ajaxSearch", new URLSearchParams({
            q: url,
            t: "media",
            lang: "id"
        }), {
            headers: {
                accept: "*/*",
                "user-agent": "PostmanRuntime/7.32.2"
            }
        })
        let result = {
            status: true,
            data: []
        }
        const $ = cheerio.load(resp.data.data)
        $(".download-box > li > .download-items").each(function () {
            result.data.push($(this).find(".download-items__btn > a").attr("href"))
        })
        return result
    } catch {
        const result = {
            status: false,
            message: "Couldn't fetch data of url"
        }
        console.log(result)
        return result
    }
}

async function igdl2(url) {
    try {
        let result = {
            status: true,
            media: []
        }
        const {
            data
        } = await axios(`https://www.y2mate.com/mates/analyzeV2/ajax`, {
            method: "post",
            data: {
                k_query: url,
                k_page: "Instagram",
                hl: "id",
                q_auto: 0
            },
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "user-agent": "PostmanRuntime/7.32.2"
            }
        })
        await data.links.video.map((video) => result.media.push(video.url))
        return result
    } catch (err) {
        const result = {
            status: false,
            message: `Media not found`
        }
        return result
    }
}

module.exports = {
    igdl,
    igdl2
};