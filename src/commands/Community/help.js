const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows all of the commands available"),

  async execute(interaction, client) {
    let page = 0;

    const page1 = new EmbedBuilder()
      .setColor(0x683986)
      .setTitle("Help Center")
      .setDescription("**Commands**:")
      .setFooter({ text: "Created by qwackies#11222" })
      .addFields({
        name: `</help:1061790825199194242>`,
        value: "Shows all of the commands available",
        inline: true,
      })
      .setTimestamp();

    const page2 = new EmbedBuilder()
      .setColor(0x683986)
      .setTitle("Help Center Continued...")
      .setDescription("**Commands**:")
      .setFooter({ text: "Created by qwackies#1122" })
    //   .addFields({
    //     name: "</ranks:1058045602774130819>",
    //     value: "Tells you which ranks and staff roles that we have",
    //     inline: true,
    //   })
      .setTimestamp();

    const pages = [page1, page2];

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("before")
        .setStyle(ButtonStyle.Danger)
        .setEmoji("1048646701533102120")
        .setDisabled(true),

      new ButtonBuilder()
        .setCustomId("next")
        .setStyle(ButtonStyle.Success)
        .setEmoji("1048646695027744768")
    );
    const message = await interaction.reply({
      embeds: [page1],
      components: [buttons],
    });
    const collector = await message.createMessageComponentCollector();

    collector.on("collect", async (i) => {
      if (i.customId == "next" && page < pages.length - 1) {
        page++;

        buttons.components[0].data.disabled = false;
        buttons.components[1].data.disabled = true;

        buttons.components[0].data.style = 3;
        buttons.components[1].data.style = 4;

        if (i.user.id !== interaction.user.id) {
          await i.reply({
            content: `Only ${interaction.user.tag} can change pages. Do /help if you want to do it yourself.`,
            ephemeral: true,
          });
          return;
        }

        await i.update({ embeds: [pages[page]], components: [buttons] });
      }

      if (i.customId == "before" && page > 0) {
        page--;

        buttons.components[1].data.disabled = false;
        buttons.components[0].data.disabled = true;

        buttons.components[1].data.style = 3;
        buttons.components[0].data.style = 4;

        if (i.user.id !== interaction.user.id) {
          await i.reply({
            content: `Only ${interaction.user.tag} can change pages. Do /help if you want to do it yourself.`,
            ephemeral: true,
          });
          return;
        }

        await i.update({ embeds: [pages[page]], components: [buttons] });
      }
    });
  },
};
