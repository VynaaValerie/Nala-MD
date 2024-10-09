
const express = require('express');
const os = require('os');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const CFonts = require('cfonts');
const chalk = require('chalk');

const app = express();
const port = 3009; // Custom port here, for example: (8080, 3000, 5000) and others
const namebot = 'NALAA'
const nameowner = '@vynaa_valerie'
// Function to display header information
function displayHeader() {
    
    // Menampilkan nama bot dengan CFonts
    CFonts.say(namebot, {
        font: 'simple',
        align: 'center',
        colors: ['yellow'],
        background: 'transparent',
        letterSpacing: '0'
    });
    CFonts.say('Made by VynaaValerie', {
        font: 'console',
        align: 'center',
        colors: ['white'],
        background: 'transparent',
        letterSpacing: '0'
    });
    // Menampilkan informasi tentang pembuat bot

    // Menampilkan informasi sistem menggunakan chalk
console.log(chalk.white.bold(`
- 📱 Platform: ${os.platform()}
- 🏛️ Architecture: ${os.arch()}
- 💻 Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
- 🚀 Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB
`));

}

// Tampilkan header informasi
displayHeader();
// Clear console
console.clear();

// Set up routes
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const data = {
        status: 'true',
        message: `${namebot} is now running`,
        author: nameowner
    };

    const result = {
        response: data
    };
    res.send(JSON.stringify(result, null, 2));
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Cluster
let isRunning = false;

function start(file) {
    if (isRunning) return;
    isRunning = true;

    const args = [path.join(__dirname, file), ...process.argv.slice(2)];
    const p = spawn(process.argv[0], args, {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    });

    p.on('message', (data) => {
        console.log(`[ ${namebot} ]${data}`);
        switch (data) {
            case 'reset':
                p.kill();
                isRunning = false;
                start.apply(this, arguments);
                break;
            case 'uptime':
                p.send(process.uptime());
                break;
        }
    });

    p.on('exit', (code) => {
        isRunning = false;
        console.error(`❌ Bot system stopped with code: ${code}`);

        if (code === 0) return;

        fs.watchFile(args[0], () => {
            fs.unwatchFile(args[0]);
            start('start.js');
        });
    });

    p.on('error', (err) => {
        console.error('\x1b[31m%s\x1b[0m', `Error: ${err}`);
        p.kill();
        isRunning = false;
        start('start.js');
    });

    const pluginsFolder = path.join(__dirname, 'plugins');

    fs.readdir(pluginsFolder, (err, files) => {
        if (err) {
            console.error(`Error reading plugins folder: ${err}`);
            return;
        }

        // Display header information
        displayHeader();
    });

    setInterval(() => {}, 1000);
}

start('start.js');

process.on('unhandledRejection', () => {
    console.error('\x1b[31m%s\x1b[0m', 'Unhandled promise rejection. Script will restart...');
    start('start.js');
});

process.on('exit', (code) => {
    console.error(`Exited with code: ${code}`);
    console.error('Script will restart...');
    start('start.js');
});