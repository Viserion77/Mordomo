import * as dotenv from 'dotenv';
import {Client} from 'discord.js';
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

  await mordomoClient.login(process.env.DISCORD_BOT_TOKEN);
})();
