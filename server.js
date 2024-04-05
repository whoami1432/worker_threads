const { Worker } = require('worker_threads');
const db = require('./worker-thread');

var app = require('express')();

app.get('/test',async  (req, res) => {
	res.status(200).send('Hello World! ')
});

// Heavy load request with worker threads
app.get('/heavybutnotblock', async (req, res) => {

	const worker = new Worker('./worker-thread.js', { workerData: { initialAction: true }});
	worker.on("message", (val) => {
		return res.status(200).send('Total ->  ' + val)
	})
	worker.on('error', (err) => {
		console.log(err);
	})

	worker.on('online', () =>{
		console.log('onlie');
	})
});

// Heavy load request with worker threads
app.get('/heavybutblocktheotherprocess', async (req, res) => {
	let count = 0;
	 for (let index = 0; index < 10000000000; index++) {
        count = count + index + 1;
    }
	res.status(200).send({count: count, message: 'slow route blocks io operations or other requests'})

});

app.listen(8000, function() {
	console.log('Process ' + process.pid + ' is listening to all incoming requests');
});
