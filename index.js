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
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});
import { createWriteStream } from 'fs';
import { mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import cliProgress from 'cli-progress';  // Import modul cli-progress


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
    // Menggunakan promise untuk menunggu input dari pengguna
    const userInput = await new Promise((resolve) => {
        rl.question("Masukkan link YouTube: ", (answer) => {
            resolve(answer);
        });
    });
    const userInputQuality = await new Promise((resolve) => {
        rl.question("Masukkan Resolusi: ", (answer) => {
            resolve(answer);
        });
    });

    // Jika input diberikan
    if (userInput) {
        try {
            // Menggunakan input pengguna sebagai link YouTube
            const v = await youtube(userInput); // Menggunakan link YouTube yang diberikan pengguna
            console.log(v); // Menampilkan semua metadata
            console.log(v.download); // Menampilkan informasi download

            

// Cek dan buat folder downloads jika belum ada
if (!existsSync(resolve('./downloads'))) {
    mkdirSync(resolve('./downloads'));
}

const videoUrl = await v.download.video(userInputQuality);
console.log("URL Video:", videoUrl);

const videoTitle = v.download.title; // Mendapatkan judul video dari metadata
const sanitizedTitle = videoTitle.replace(/[<>:"\/\\|?*]+/g, ''); // Menghapus karakter yang tidak diizinkan dalam nama file
const filePath = resolve('./downloads', `${sanitizedTitle}.mp4`); // Menggunakan judul video untuk nama file
const writer = createWriteStream(filePath);

// Membuat progress bar baru
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// Menggunakan axios untuk download file dengan stream dan menampilkan progress
axios({
    url: videoUrl,
    method: 'GET',
    responseType: 'stream'
}).then(response => {
    const totalLength = response.headers['content-length'];

    // Cek apakah content-length ada
    if (totalLength) {
        // Inisialisasi progress bar dengan total ukuran file
        progressBar.start(parseInt(totalLength), 0);
    } else {
        console.log('Progres download tidak bisa diukur (content-length undefined)');
    }

    response.data.pipe(writer);

    // Event untuk memonitor progress jika content-length diketahui
    let downloadedLength = 0;
    response.data.on('data', (chunk) => {
        downloadedLength += chunk.length;
        if (totalLength) {
            // Update progress bar dengan jumlah byte yang sudah didownload
            progressBar.update(downloadedLength);
        }
    });

    writer.on('finish', () => {
        if (totalLength) {
            progressBar.stop();  // Stop progress bar setelah selesai
        }
        console.log(`File berhasil diunduh ke ${filePath}`);
    });

    writer.on('error', (err) => {
        console.error('Gagal mendownload file:', err);
    });
}).catch(err => {
    console.error('Error saat mendownload:', err);
});

            // Jika ingin mendownload audio, tinggal aktifkan baris ini
            // const audioUrl = await v.download.audio('mp3'); // Mendapatkan URL audio dengan format mp3
            // console.log(audioUrl);
        } catch (error) {
            console.error("Terjadi kesalahan dalam memproses link:", error);
        } finally {
            rl.close(); // Menutup interface readline setelah selesai
        }
    } else {
        console.log("Link YouTube tidak dimasukkan.");
        rl.close(); // Menutup interface readline
    }
};
inputLink();
//coba-coba dia:3