import mineflayer from 'mineflayer';
import fs from 'fs';
import './keepalive.js';

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

const bot = mineflayer.createBot({
  host: config.host,
  port: config.port,
  username: config.username,
  auth: config.auth || 'offline',
});

bot.on('spawn', () => {
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 200);
  }, 1000);
});