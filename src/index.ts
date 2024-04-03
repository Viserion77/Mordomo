import * as dotenv from 'dotenv';
import {ChannelType, Client} from 'discord.js';
import {IntentOptions} from './config/IntentOptions';
import {onInteraction} from './events/onInteraction';
import {onReady} from './events/onReady';
import {validateEnv} from './utils/validateEnv';

dotenv.config();
(async () => {
  if (!validateEnv()) return;
  const mordomoClient = new Client({intents: IntentOptions});

  mordomoClient.on('ready', async () => await onReady(mordomoClient));

  mordomoClient.on(
    'interactionCreate',
    async interaction => await onInteraction(interaction)
  );

  let canais = 0;
  const serverSettings: {
    [key: string]: {
      proxyChannelId: string;
      channelPattern: string;
    }[];
  } = {};

  mordomoClient.on('voiceStateUpdate', async (oldState, newState) => {
    if (serverSettings[newState.guild.id] === undefined) return;

    for (const {proxyChannelId, channelPattern} of serverSettings[
      newState.guild.id
    ]) {
      if (newState.channelId === proxyChannelId) {
        const parentId = newState.channel?.parentId;
        if (!parentId) return;

        const newChannel = await newState.guild.channels.create({
          name: `${channelPattern} ${++canais}`,
          type: ChannelType.GuildVoice,
          parent: parentId,
        });

        await newState.setChannel(newChannel);
      }

      if (
        oldState.channel?.name?.includes(channelPattern) &&
        oldState.channel.members.size === 0
      ) {
        await oldState.channel.delete();
      }
    }
  });

  await mordomoClient.login(process.env.DISCORD_BOT_TOKEN);
})();
