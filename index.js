require('dotenv').config();
const TOKEN = process.env.TOKEN;

// Turn On
import { Client } from 'discord.js';
const bot = new Client();
bot.login(TOKEN);
bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('messageReactionAdd', msg => {
  console.log('reactions',msg.emoji.name);
});

var comandoIniciado = false;
var contaMensagens = 0;
bot.on('message', msg => {

  const user = msg.author;
  if (!(user.tag.match(/ByVisTMoAi#3981/))) {

    if (msg.content.match(/mordomo/)) {
      comandoIniciado = true;
      if (user.tag.match(/Viserion#0025/)) {
        msg.channel.send('Oi viserion...');
      } else if (user.tag.match(/#/)) {
        msg.channel.send('Diga...');
      } else {
        msg.reply('AAAAAAAAAAAAAAA não me bulga porra');
      }
    }

    if (comandoIniciado) {
      if (msg.content.match(/add/)) {
        msg.channel.send('Não ta pronto ainda e vc sabe disse, não tem graça');
        //lista.push({id:1,title:"job"});
        //msg.reply(lista.values);
        contaMensagens++;
      } else if (msg.content.match(/vamo jogar/)) {
        msg.channel.send('Eu até ia, pra te fazer compania, mas eu so um bot...');
        contaMensagens++;
      } else if (msg.content.match(/literalmente/)) {
        msg.channel.send('Não zoa porra \'-\'');
        contaMensagens++;
      } else if (msg.content.match(/Espera ai/)) {
        msg.channel.send('... \'-\'');
      } else {
        contaMensagens++;
      }
    }
    if (contaMensagens == 5) { comandoIniciado = false; }
  }
});
