/**
 * Menambahkan perintah untuk mengecek apakah bot sedang aktif.
 *
 * @param {Object} command - Objek perintah.
 * @param {string} command.pattern - Pola regex untuk mencocokkan perintah.
 * @param {boolean} command.fromMe - Apakah perintah harus dari pemilik bot.
 * @param {string} command.desc - Deskripsi perintah.
 * @param {Function} callback - Fungsi callback yang dijalankan saat perintah cocok.
 * @param {Object} msg - Objek pesan.
 * @param {Object} msg.key - Objek kunci dari pesan.
 * @param {string} msg.key.remoteJid - JID remote dari grup atau pengguna.
 * @param {Object} match - Objek hasil pencocokan.
 * @param {Object} sock - Objek socket untuk mengirim pesan.
 * @returns {Promise<void>} - Promise yang selesai saat pesan terkirim.
*/

const fs = require('fs');

addCommand({ pattern: "^alive$", access: "all", desc: "_Cek apakah bot sedang aktif._" }, async (msg, match, sock, rawMessage) => {
    const grupId = msg.key.remoteJid;
    const aliveMessage = global.database.aliveMessage;
    const mediaPath = `./alive.${aliveMessage.type}`;

    // Menambahkan identitas ke konten jika kosong
    let content = aliveMessage.content;
    if (content === "") {
        content = "Halo! **USERBOT Fahri** siap melayani. Saya sedang aktif sekarang! 🚀";
    }

    if (aliveMessage.type === "text") {
        if (msg.key.fromMe) {
            return await sock.sendMessage(grupId, {
                edit: msg.key,
                text: content
            });
        } else {
            return await sock.sendMessage(grupId, {
                text: content
            }, { quoted: rawMessage.messages[0] });
        }
    }

    if (!fs.existsSync(mediaPath)) {
        fs.writeFileSync(mediaPath, aliveMessage.media, "base64");
    }

    if (msg.key.fromMe) {
        await sock.sendMessage(grupId, {
            delete: msg.key
        });
    }

    const messageOptions = {
        [aliveMessage.type]: { url: mediaPath },
        caption: content
    };

    return await sock.sendMessage(grupId, messageOptions, { quoted: rawMessage.messages[0] });
});
