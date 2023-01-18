const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('Check out the shop!'),
    
    async execute(interaction, client){
        await interaction.reply('work in progress rn :)')
    }
}