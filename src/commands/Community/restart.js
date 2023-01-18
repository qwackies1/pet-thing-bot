const { SlashCommandBuilder} = require('@discordjs/builders');
const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Embed,
} = require("discord.js");
const profile = require('../../Schemas.js/profile.js');
  
const profileSchema = require('../../Schemas.js/profile.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Restarts your progress! (Once you confirm, there is no going back.)'),
    
    async execute(interaction){
        const createProfile = new EmbedBuilder()
            .setColor('Red')
            .addFields({ name: 'Error!', value: 'You need to create a profile with /start!' })
        
        const areYouSure = new EmbedBuilder()
            .setColor('DarkGold')
            .setTitle('Hold up!')
            .setDescription('Are you sure you want to proceed? All of your data will be gone. Reply by clicking the checkbox.')

        const success = new EmbedBuilder()
            .setColor('Green')
            .setTitle('Success!')
            .setDescription('You have successfully reset your profile!')

        profileSchema.findOne({ userID: interaction.user.id}, async (err, data) => {
            if (err) throw err;

            if (!data){
                await interaction.reply({ embeds: [createProfile] });
            }

            if (data) {
                const buttons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("reset")
                            .setStyle(ButtonStyle.Success)
                            .setEmoji("1063275759764000788")
                    );

                const message = await interaction.reply({
                    embeds: [areYouSure],
                    components: [buttons],
                });

                const collector = await message.createMessageComponentCollector();

                collector.on("collect", async (i) => {
                    if (i.customId == "reset") {
                        if (i.user.id !== interaction.user.id) {
                            await i.reply({
                                content: `Why are you trying to reset someone elses account?`,
                                ephemeral: true,
                            });

                            return;
                        }

                        profile.findOneAndDelete({ Guild: interaction.guild.id }, async (err, data) => {
                            if (err){
                                throw err
                            } else{
                                profileSchema.create({
                                    userID: interaction.user.id,
                                    coins: 0,
                                    job: 0,
                                    inventory: [],
                                    pet: 0,
                                    hourly_beg: 0,
                                    daily_work: 0,
                                })
                                await interaction.followUp({ embeds: [success] })
                            }
                        });
                    }
                });
            }
        })
    }
}