const chai = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://localhost';
mongoose.connect(`${MONGO_URL}/testpush`, { useNewUrlParser: true, autoIndex: false });
const models = require('../src/models')(mongoose);
const Worker = require('../src/worker')(models);

describe('workers', function() {
    this.timeout(5000);
    let worker;

    it('create', function() {
        worker = Worker.create();
        assert.isObject(worker);
    })

    it('fetch', async function() {
        const workers = await Worker.fetch('new');
        const workerCopy = JSON.stringify(worker);
        const lastWorker = JSON.stringify(workers[workers.length - 1]);
        assert.equal(lastWorker, workerCopy);
    })

    it('fetchById', async function() {
        const targetWorker = JSON.stringify(await Worker.fetchById(worker._id));
        const workerCopy = JSON.stringify(worker);
        assert.equal(workerCopy, targetWorker);
    })

    it('fetch can filter', async function() {
        const workers = await Worker.fetch(['dummy']);
        assert.equal(workers.length, 0);
    })

    it('update', async function() {
        const curWorker = await Worker.update(worker._id, 'pending');
        assert.equal(curWorker.state.name, 'pending');
        assert.equal(curWorker.prevState[0].name, 'new');
    })
})

before(function() {

})

after(function() {
    mongoose.connection.close(function() {
        process.exit(0);
    });
}) 
