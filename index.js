var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createInterface } from 'readline';

// Membuat interface untuk membaca input
import { createWriteStream } from 'fs';
import { mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import ProgressBar  from 'progress';  // Import modul cli-progress

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

import yts from "yt-search";
import axios from "axios";
/**
 * Scraped By Kaviaann
 * Protected By MIT LICENSE
 * Whoever caught removing wm will be sued
 * @description Any Request? Contact me : vielynian@gmail.com
 * @author Kaviaann 2024
 * @copyright https://whatsapp.com/channel/0029Vac0YNgAjPXNKPXCvE2e
 */
export function youtube(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                data = data.trim();
                !data &&
                    (() => {
                        return reject("Enter either a youtube link for downloading, or query for searching");
                    })();
                const yt = /youtu(\.)?be/gi.test(data);
                if (!yt) {
                    const d = yield yts(data).then((v) => v.videos);
                    return resolve({
                        type: "search",
                        query: data,
                        total: d.length || 0,
                        videos: d.map(({ videoId, views, url, title, description, image, thumbnail, seconds, timestamp, ago, author, }) => {
                            return {
                                title,
                                id: videoId,
                                url,
                                media: {
                                    thumbnail: thumbnail || "",
                                    image: image,
                                },
                                description,
                                duration: {
                                    seconds,
                                    timestamp,
                                },
                                published: ago,
                                views,
                                author,
                            };
                        }),
                    });
                }
                else {
                    const id = ((_a = /(?:youtu\.be\/|youtube\.com(?:\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/|embed\/|v\/|m\/|watch\?(?:[^=]+=[^&]+&)*?v=))([^"&?\/\s]{11})/gm.exec(data)) === null || _a === void 0 ? void 0 : _a[1]) || "";
                    if (!id)
                        return reject("Enter valid youtube video link!");
                    const { title, description, url, videoId, seconds, timestamp, views, genre, uploadDate, ago, image, thumbnail, author, } = yield yts({
                        videoId: id,
                    });
                    return resolve({
                        type: "download",
                        download: {
                            title,
                            description,
                            url,
                            id: videoId,
                            duration: {
                                seconds,
                                timestamp,
                            },
                            views,
                            genre,
                            releaseDate: uploadDate,
                            published: ago,
                            media: {
                                thumbnail,
                                image,
                            },
                            author,
                            video: (...args_1) => __awaiter(this, [...args_1], void 0, function* (quality = "1440p") {
                                return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                                    try {
                                        yield axios
                                            .post("https://api.cobalt.tools/api/json", {
                                                url: "https://youtube.com/watch?v=" + id,
                                                filenamePattern: "basic",
                                                vQuality: quality,
                                            }, {
                                                headers: {
                                                    Accept: "application/json",
                                                    origin: "https://cobalt.tools",
                                                    referer: "https://cobalt.tools/",
                                                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
                                                },
                                            })
                                            .then((v) => v.data)
                                            .then((v) => __awaiter(this, void 0, void 0, function* () {
                                                if (v.status !== "stream")
                                                    return rej("Fail to get stream for the audio!");
                                                const _ = yield axios
                                                    .get(v.url +
                                                        "&" +
                                                        new URLSearchParams({
                                                            p: "1",
                                                        }))
                                                    .then((v) => v.data);
                                                if (_.status !== "continue")
                                                    return rej("Fail to check the audio stream");
                                                return res(v.url);
                                            }));
                                    }
                                    catch (e) {
                                        return rej(e);
                                    }
                                }));
                            }),
                            audio: (...args_1) => __awaiter(this, [...args_1], void 0, function* (format = "ogg") {
                                return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                                    try {
                                        yield axios
                                            .post("https://api.cobalt.tools/api/json", {
                                                url: "https://youtube.com/watch?v=" + id,
                                                filenamePattern: "basic",
                                                aFormat: format,
                                                isAudioOnly: "true",
                                            }, {
                                                headers: {
                                                    Accept: "application/json",
                                                    origin: "https://cobalt.tools",
                                                    referer: "https://cobalt.tools/",
                                                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
                                                },
                                            })
                                            .then((v) => v.data)
                                            .then((v) => __awaiter(this, void 0, void 0, function* () {
                                                if (v.status !== "stream")
                                                    return rej("Fail to get stream for the audio!");
                                                const _ = yield axios
                                                    .get(v.url +
                                                        "&" +
                                                        new URLSearchParams({
                                                            p: "1",
                                                        }))
                                                    .then((v) => v.data);
                                                if (_.status !== "continue")
                                                    return rej("Fail to check the audio stream");
                                                return res(v.url);
                                            }));
                                    }
                                    catch (e) {
                                        return rej(e);
                                    }
                                }));
                            }),
                        },
                    });
                }
            }
            catch (e) {
                return reject(e);
            }
        }));
    });
}


const inputLink = async () => {
    const userInput = await new Promise((resolve) => {
        rl.question("Masukkan link YouTube: ", (answer) => {
            resolve(answer);
        });
    });
    
    const userInputQuality = await new Promise((resolve) => {
        rl.question("Resolusi: 8k+ | 4k | 1440p | 1080p | 720p | 480p | 360p | 240p | 144p\nMasukkan Resolusi: ", (answer) => {
            resolve(answer);
        });
    });

    if (userInput) {
        try {
            const v = await youtube(userInput);
            const videoUrl = await v.download.video(userInputQuality);
            console.log("URL Video:", videoUrl);

            const videoTitle = v.download.title;
            const sanitizedTitle = videoTitle.replace(/[<>:"\/\\|?*]+/g, ''); // Menghapus karakter yang tidak diizinkan dalam nama file
            const downloadDir = resolve('./downloads'); // Resolusi ke folder downloads

            // Cek apakah direktori 'downloads' ada, jika tidak buat direktori baru
            if (!existsSync(downloadDir)) {
                mkdirSync(downloadDir);
                console.log("Direktori 'downloads' dibuat.");
            }

            const filePath = resolve(downloadDir, `${sanitizedTitle}.mp4`); // Resolusi ke path file video
            const writer = createWriteStream(filePath);

            // Menggunakan axios untuk download file dengan stream dan menampilkan progress
            axios({
                url: videoUrl,
                method: 'GET',
                responseType: 'stream'
            }).then(response => {
                const totalLength = parseInt(response.headers['content-length'], 10);
                let downloadedLength = 0;
                let startTime = Date.now();

                if (!totalLength || isNaN(totalLength)) {
                    console.log('Progress download dimulai');

                    response.data.on('data', (chunk) => {
                        downloadedLength += chunk.length;
                        let elapsedTime = (Date.now() - startTime) / 1000;
                        let rate = (downloadedLength / elapsedTime).toFixed(2);
                        process.stdout.write(`\rDownloaded ${downloadedLength} bytes at ${rate} bytes per second.`); // Mengganti console.log dengan process.stdout.write
                    });
                } else {
                    // Inisialisasi progress bar jika totalLength valid
                        if (totalLength) {
                            var progressBar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
                                complete: '=',
                                incomplete: ' ',
                                width: 20,
                                total: parseInt(totalLength)
                            });

                    response.data.on('data', (chunk) => {
                        downloadedLength += chunk.length;
                        progressBar.tick(chunk.length);
                    });
                }

                response.data.pipe(writer);

                writer.on('finish', () => {
                    console.log(`\nFile berhasil diunduh ke ${filePath}`);
                });

                writer.on('error', (err) => {
                    console.error('Gagal mendownload file:', err);
                });
                }
            }).catch(err => {
                console.error('Error saat mendownload:', err);
            });

        } catch (error) {
            console.error("Terjadi kesalahan dalam memproses link:", error);
        } finally {
            rl.close();
        }
    } else {
        console.log("Link YouTube tidak dimasukkan.");
        rl.close();
    }
};
inputLink();
//coba-coba dia:3