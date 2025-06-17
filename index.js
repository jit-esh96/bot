import mineflayer from 'mineflayer';
import fs from 'fs';
import './keepalive.js';

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

function createBot() {
  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    auth: config.auth || 'offline',
  });

  bot.on('spawn', () => {
    console.log('Bot spawned in the server.');

    // Make the bot jump every second
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 200);
    }, 1000);
  });

  // Reconnect if disconnected
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5s...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => {
    console.error('Bot encountered an error:', err);
  });
}

createBot();
