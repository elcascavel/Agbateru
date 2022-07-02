module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		setInterval(() => {
			client.user.setActivity('Maintenance mode', { type: 'WATCHING' });
		}, 60000);
	},
};

//`${client.guilds.cache.size} servers`