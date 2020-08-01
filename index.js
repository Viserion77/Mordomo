require('dotenv').config();
const TOKEN = process.env.TOKEN;
let toDiscordVariables = [];
let lestValidation = 0;
// 

// Turn On
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(TOKEN);
client.on('ready', () => {
  
  console.info(`Logado como ${client.user.tag}!`);
});

client.on('messageDelete', msg => {
  console.log('messageDelete', msg.content);
});

client.on('messageReactionAdd', msg => {
  console.log('reactions', msg.emoji.name);
});

var comandoIniciado = false;
var contaMensagens = 0;
client.on('message', msg => {

  console.log(client.uptime)
  if (client.uptime>=(lestValidation+86400000000)){
    lestValidation=client.uptime
    let mensagensOk=false;
    var now = Date.now()
    client.guilds.forEach(guild => {
        guild.channels.forEach(channel => {
          if (!mensagensOk && channel.type==='text'){
            mensagensOk=true;
            guild.members.forEach(member => {
              var joinIn = new Date(member.joinedTimestamp)
              var ageDate = new Date(member.joinedTimestamp - now)
              if (joinIn.getDay === now.getDay && joinIn.getMonth === now.getMonth) {
                if (ageDate===1) {
                  channel.send(`${member.nickname} está fazendo aniversário de servidor, é um ano, mas é alguma coisa\n${member.user.tag} só te digo 2 coisas, Para Bens`)
                } else {
                  channel.send(`${member.nickname} está fazendo aniversário de servidor, são tipo ${ageDate} anos ai...\n${member.user.tag} só te digo 2 coisas, Para Bens`)
                }
              }
            });
          }
      });
    });
  }

  let roles = {};
  let isDeveloper=false;
  msg.guild.members.forEach(memberFor => {
    if (memberFor.user.tag === msg.author.tag){
      roles=memberFor.roles
      memberFor.roles.forEach(role => {
        if(role.name==='Developer') {
          isDeveloper=true
        }
      });
    }
  });
  if (isDeveloper) {
    if (msg.content.substring(0, 3) == 'set') {
      const tamanho = msg.content.length + 1
      var variable = ''
      var value = ''
      var invariable = true
      for (var i = 5; i < tamanho; i++) {
        if (invariable && msg.content.substring(i - 1, i) === ' ' || msg.content.substring(i - 1, i) === '=') {
          if (msg.content.substring(i - 1, i) === ' ') i++
          invariable = false
          i++
        }
        if (invariable) variable = variable.concat(msg.content.substring(i - 1, i))
        if (!invariable) value = value.concat(msg.content.substring(i - 1, i))
      }
      if (toDiscordVariables.find(variables => variables.variable === variable)) {
        //toDiscordVariables.splice(variables, 1, { 'variable': variable, 'value': value })
      } else {
        toDiscordVariables.push({ 'variable': variable, 'value': value })
      }
      msg.delete();
    }
    if (msg.content.substring(0, 5) == 'write') {
      const tamanho = msg.content.length + 1
      var variable = ''
      var value = ''
      var invariable = true
      for (var i = 7; i < tamanho; i++) {
        if (invariable && msg.content.substring(i - 1, i) === ' ' || msg.content.substring(i - 1, i) === '=') {
          invariable = false
          i++
        }
        if (invariable) variable = variable.concat(msg.content.substring(i - 1, i))
        if (!invariable) value = value.concat(msg.content.substring(i - 1, i))
      }
      if (toDiscordVariables.find(variables => variables.variable === variable)) {
        msg.channel.send(toDiscordVariables.find(variables => variables.variable === variable).value)
      } else {
        msg.channel.send(variable.concat(value))
      }
      msg.delete();
    }
  }

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
