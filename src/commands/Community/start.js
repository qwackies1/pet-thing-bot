const { SlashCommandBuilder} = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')
const profileSchema = require('../../Schemas.js/profile.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Start your game!'),
    
    async execute(interaction){
        const createdSuccessfully = new EmbedBuilder()
            .setColor('Green')
            .addFields({ name: 'Success!', value: 'You have successfully created a profile!' })

        const alreadyCreated = new EmbedBuilder()
            .setColor('Red')
            .addFields({ name: 'Error!', value: 'You have already created a profile!' })

        profileSchema.findOne({ userID: interaction.user.id}, async (err, data) => {
            if (err) throw err;

            if (!data){
                profileSchema.create({
                    userID: interaction.user.id,
                    coins: 0,
                    job: 0,
                    inventory: [],
                    pet: 0,
                    hourly_beg: 0,
                    daily_work: 0,
                })
                await interaction.reply({ embeds: [createdSuccessfully] });
            } else if (data){
                await interaction.reply({ embeds: [alreadyCreated] })
            }
        })
    }
}