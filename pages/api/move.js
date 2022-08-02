import mqtt from 'mqtt';

const client = mqtt.connect('https://broker.emqx.io');

export default function handler(req, res) {
	try {
		if (req.method !== 'POST') throw 'Only POST requests allowed';

		const dir = req.body.dir;
		const on = req.body.on;

		if (!['f', 'r', 'b', 'l'].includes(dir) || (on !== true && on !== false))
			throw `Invalid Request Body: ${JSON.stringify(req.body)}`;

		const codes = {
			f: 'Forward',
			r: 'Right',
			b: 'Backward',
			l: 'Left'
		};

		client.publish('internet', `${dir}${on}`, console.log);

		console.log(`${codes[dir]} ${on ? 'ON' : 'OFF'}`);

		res.send(`${codes[dir]} ${on ? 'ON' : 'OFF'}`);
	} catch (error) {
		console.log(error);
		res.send('Error!');
	}
}
