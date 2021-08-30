module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} on server ${interaction.guild.name} triggered an interaction.`);
	},
};