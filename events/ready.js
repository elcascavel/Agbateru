module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		setInterval(() => {
			client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 'WATCHING' });
		}, 60000);
	},
};