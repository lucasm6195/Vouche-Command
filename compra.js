const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('compra')
    .setDescription('Valora tu compra')
    .addStringOption(option =>
      option.setName('producto')
        .setDescription('Producto que has adquirido')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('puntuacion')
        .setDescription('Puntuación del 1 al 10')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(10)
    )
    .addStringOption(option =>
      option.setName('opinion')
        .setDescription('Opinión sobre el producto comprado')
        .setRequired(true)
    ),
  async execute(interaction) {
    const producto = interaction.options.getString('producto');
    const puntuacion = interaction.options.getInteger('puntuacion');
    const opinion = interaction.options.getString('opinion');

    const puntuacionEnEstrellas = (puntuacion) => '⭐'.repeat(puntuacion);

    const embed = new EmbedBuilder()
      .setTitle(`__Valoración de Compra__`)
      .setDescription(`> Valoración realizada por <@${interaction.user.id}>`)
      .addFields(
        { name: ':shopping_cart: · Producto', value: producto },
        { name: ':trophy: · Puntuación', value: puntuacionEnEstrellas(puntuacion) },
        { name: ':speech_balloon: · Opinión', value: opinion }
      )
      .setFooter({ text: `Sistema de Valoraciones・${interaction.guild.name}`, iconURL: interaction.guild.iconURL() });

        const valoracionesChannel = interaction.guild.channels.cache.get('1233143355807105135'); // ID del canal de valoraciones
    if (!valoracionesChannel) {
      return interaction.reply({ content: "No se encontró el canal de valoraciones.", ephemeral: true });
    }
    await valoracionesChannel.send({ embeds: [embed] });

    const agradecimientoEmbed = new EmbedBuilder()
      .setDescription(`Grcias por tu valoración. El mensaje de valoración de tu compra se ha enviado por el canal <#${valoracionesChannel.id}>.`)

    await interaction.reply({ embeds: [agradecimientoEmbed], ephemeral: true });
  },
};