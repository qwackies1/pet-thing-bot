const { SlashCommandBuilder} = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')
const ms = require('parse-ms')
const profileSchema = require('../../Schemas.js/profile.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('work')
        .setDescription('Work for coins.'),
    
    async execute(interaction){
    
        profileSchema.findOne({ userID: interaction.user.id}, async (err, data) => {
            const randomCoinAmount = 112 + Math.round(Math.random() * 38)
            const createProfile = new EmbedBuilder()
                .setColor('Red')
                .addFields({ name: 'Error!', value: 'You need to create a profile with /start!' })

            if (err) throw err;
            if(!data){
                await interaction.reply({ embeds: [createProfile] })
            } else if (data){
                const timeout = 86400000

                if(timeout - (Date.now() - data.daily_work) > 0){
                    const duration = ms(timeout - (Date.now() - data.daily_work))
                    const alrClaimed1 = new EmbedBuilder()
                        .setColor('Red')
                        .addFields({ name: 'Uh oh!', value: `You need to take a break. Check back in ${duration.hours} hours.`})
                    const alrClaimed2 = new EmbedBuilder()
                        .setColor('Red')
                        .addFields({ name: 'Uh oh!', value: `You need to take a break. Check back in ${duration.minutes} minutes.`})
                    const alrClaimed3 = new EmbedBuilder()
                        .setColor('Red')
                        .addFields({ name: 'Uh oh!', value: `You need to take a break. Check back in ${duration.seconds} seconds.`})

                    if (duration.hours > 0) interaction.reply({ embeds: [alrClaimed1] })
                    else if (duration.hours == 0 && duration.minutes > 0) interaction.reply({ embeds: [alrClaimed2] })
                    else if (duration.hours == 0 && duration.minutes == 0 && duration.seconds > 0) interaction.reply({ embeds: [alrClaimed3] })
                } else{
                    const coinsAdded = new EmbedBuilder()
                        .setColor('Green')
                        .setDescription(`${String(randomCoinAmount)} coins have been added to your balance!`)

                    data.coins = data.coins + randomCoinAmount
                    data.daily_work = Date.now()
                    await data.save()

                    await interaction.reply({ embeds: [coinsAdded] })
                }
            }
        })
    }
}