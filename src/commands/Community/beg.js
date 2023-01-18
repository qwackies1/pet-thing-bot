const { SlashCommandBuilder} = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')
const ms = require('parse-ms')
const profileSchema = require('../../Schemas.js/profile.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('beg')
        .setDescription('beg for coins'),
    
    async execute(interaction){
    
        profileSchema.findOne({ userID: interaction.user.id }, async (err, data) => {
            const randomCoinAmount = Math.round(Math.random() * 5)
            const createProfile = new EmbedBuilder()
                .setColor('Red')
                .addFields({ name: 'Error!', value: 'You need to create a profile with /start!' })

            if (err) throw err;
            if(!data){
                await interaction.reply({ embeds: [createProfile] })
            } else if (data){
                const timeout = 3600000

                if(timeout - (Date.now() - data.hourly_beg) > 0){
                    const duration = ms(timeout - (Date.now() - data.hourly_beg))
                    const alrClaimed1 = new EmbedBuilder()
                        .setColor('Red')
                        .addFields({ name: 'Uh oh!', value: `Thats enough begging. Check back in ${duration.minutes} minutes.`})
                    
                    const alrClaimed2= new EmbedBuilder()
                        .setColor('Red')
                        .addFields({ name: 'Uh oh!', value: `Thats enough begging. Check back in ${duration.seconds} seconds.`})

                    if(duration.minutes > 0) interaction.reply({ embeds: [alrClaimed1] })
                    else if(duration.minutes == 0) interaction.reply({ embeds: [alrClaimed2] })
                } else{
                    const oneCoin = new EmbedBuilder()
                        .setColor('Green')
                        .setDescription('One coins has been added to your balance!')

                    const coinsAdded = new EmbedBuilder()
                        .setColor('Green')
                        .setDescription(`${String(randomCoinAmount)} coins have been added to your balance!`)

                    data.coins = data.coins + randomCoinAmount
                    data.hourly_beg = Date.now()
                    await data.save()

                    if (randomCoinAmount == 1){
                        await interaction.reply({ embeds: [oneCoin] })
                    } else{
                        await interaction.reply({ embeds: [coinsAdded] })
                    }
                }
            }
        })
    }
}