addCommand({ pattern: "^afk$", access: "sudo", desc: "_Mengaktifkan atau menonaktifkan mode AFK._" }, async (msg, match, sock, rawMessage) => {
    const grupId = msg.key.remoteJid;
    const afkMessage = global.database.afkMessage;
    
    if (afkMessage.active) {
        global.database.afkMessage.active = false;
        if (msg.key.fromMe) {
            return await sock.sendMessage(grupId, { text: "_✅ Mode AFK USERBOT Fahri berhasil dinonaktifkan._", edit: msg.key });
        } else {
            return await sock.sendMessage(grupId, { text: "_✅ Mode AFK USERBOT Fahri berhasil dinonaktifkan._"}, { quoted: rawMessage.messages[0] });
        }
    } else {
        global.database.afkMessage.active = true;
        if (afkMessage.type == "text" && afkMessage.content == "") {
            global.database.afkMessage.content = "_USERBOT Fahri sedang AFK! Silakan hubungi lagi nanti._";
        }
        if (msg.key.fromMe) {
            return await sock.sendMessage(grupId, { text: "_✅ Mode AFK USERBOT Fahri berhasil diaktifkan._", edit: msg.key });
        } else {
            return await sock.sendMessage(grupId, { text: "_✅ Mode AFK USERBOT Fahri berhasil diaktifkan._"}, { quoted: rawMessage.messages[0] });
        }
    }
});
