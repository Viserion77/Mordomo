import {EmbedBuilder, SlashCommandBuilder} from 'discord.js';
import {Command} from '../interfaces/Command';

export const help: Command = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Provides information on using this bot.'),
  run: async interaction => {
    await interaction.deferReply();

    const helpEmbed = new EmbedBuilder();
    helpEmbed.setFooter({text: `Version ${process.env.npm_package_version}`});
    helpEmbed.setColor(0x0077ff);

    await interaction.editReply({embeds: [helpEmbed]});
    return;
  },
};
