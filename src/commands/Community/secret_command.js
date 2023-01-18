const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('secret')
        .setDescription('hmmm... sus')
        .addStringOption(option =>
			option
				.setName('password')
				.setDescription('password to enter')),
    
    async execute(interaction, client){
        const wrongPassword = new EmbedBuilder()
            .setColor('Red')
            .addFields({ name: 'Wrong password!', value: 'Hint, the password is ||qwackies||'})

        const correct = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('⚠️ IMPORTANT ⚠️')
        
        if (interaction.options.getString('password') !== 'qwackies'){
            interaction.reply({ embeds: [wrongPassword], ephemeral: true})
        } else if(interaction.options.getString('password') == 'qwackies'){
            await interaction.reply({ embeds: [correct] })
            await interaction.followUp({
                files: [{
                   attachment: "https://cdn.discordapp.com/attachments/966844388967841893/970424150550265866/SPOILER_SPOILER_SPOILER_SPOILER_SPOILER_SPOILER_SPOILER_SPOILER_SPOILER_SPOILER_SPOILER_something-2.png",
                   name: "SPOILER_FILE.jpg"
                }]
             })
        }
    }
}