const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
const config = require('./config.json');
const fetch = require('node-fetch');
const querystring = require('querystring');
client.config = config;
client.fetch = fetch;
client.querystring = querystring;

const fs = require('fs');

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const props = require(`./commands/${file}`);
		const commandName = file.split('.')[0];
		console.log(`Attempting to load command ${commandName}`);
		client.commands.set(commandName, props);
	});
});

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
	setInterval(() => {
		client.user.setActivity(`${client.guilds.cache.size} servers | ++help`, { type: 'WATCHING' });
	}, 60000);
});

// login to Discord with your app's token
client.login(config.token);