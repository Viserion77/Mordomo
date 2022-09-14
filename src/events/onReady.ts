import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import {type Client} from 'discord.js';
import {CommandList} from '../commands';

export const onReady = async (discordClient: Client) => {
  const rest = new REST({version: '9'}).setToken(
    process.env.DISCORD_BOT_TOKEN as string
  );

  const commandData = CommandList.map(command => command.data.toJSON());

  await Promise.all(
    discordClient.guilds.cache.map(guild =>
      rest.put(
        Routes.applicationGuildCommands(
          discordClient.user?.id || 'missing id',
          guild.id
        ),
        {body: commandData}
      )
    )
  );

  console.log('Discord is ready!');
};
