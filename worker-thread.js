'use strict';
const { parentPort,  workerData } = require('worker_threads');

try {
    if (workerData?.initialAction === true) {
        let count = 0;
        for (let index = 0; index < 10000000000; index++) {
            count = count + index + 1;
        }
    
        if (parentPort) {
            console.log(`Worker ${process.pid} finished with result: ${count}`);
            return parentPort.postMessage(count);
        } else {
            console.log(`Worker ${process.pid} finished with result: ${count}, but parentPort is not available.`);
        }
    }

} catch (err) {
    console.log(err);
}
