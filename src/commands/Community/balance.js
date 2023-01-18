const { SlashCommandBuilder} = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')
const profileSchema = require('../../Schemas.js/profile.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Checks your balance!'),
    
    async execute(interaction){
        const createProfile = new EmbedBuilder()
            .setColor('Red')
            .addFields({ name: 'Error!', value: 'You need to create a profile with /start!' })

        profileSchema.findOne({ userID: interaction.user.id}, async (err, data) => {
            if (err) throw err;

            if (!data){
                await interaction.reply({ embeds: [createProfile] });
            }

            if (data) {
                const coins = data.coins;
                const balance = new EmbedBuilder()
                    .setTitle('Your Balance')
                    .setDescription(`**Coins**: ${coins} 🪙 `)

                await interaction.reply({ embeds: [balance] })
            }
        })
    }
}