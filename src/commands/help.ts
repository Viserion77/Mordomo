import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interfaces/Command";

export const help: Command = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Provides information on using this bot."),
  run: async (interaction) => {
    await interaction.deferReply();
    const helpEmbed = new MessageEmbed();
    helpEmbed.setTitle("I'm mordomo!");
    helpEmbed.setDescription(
      "estou aqui para mordomar você!"
    );
    // helpEmbed.addField(
    //   "",
    //   ""
    // );
    helpEmbed.setFooter({ text: `Version ${process.env.npm_package_version}` });
    await interaction.editReply({ embeds: [helpEmbed] });
    return;
  },
};
