const fetch = require('node-fetch');

if(process.argv.length < 4) {
	console.log("Usage: "+process.argv[0]+" "+process.argv[1]+" [token] [channel]");
	process.exit(1);
}

const token = process.argv[2];
const channel = process.argv[3];

function fetchMessages(before) {
	let url = "https://discordapp.com/api/channels/"+encodeURIComponent(channel)+"/messages?token="+encodeURIComponent(token)+"&limit=100";
	if(before) {
		url += "&before="+encodeURIComponent(before);
	}
	return fetch(url)
	.then(res => res.json());
}

function loop(before) {
	fetchMessages(before)
	.then(function(msgs) {
		console.log(JSON.stringify(msgs));
		return loop(msgs[msgs.length-1].id);
	});
}

loop();
