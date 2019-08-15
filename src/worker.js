
module.exports = function(models) {
    return {
        create: function(msg) {
            const state = models.State();
            state.name = 'new';
            state.tstamp = new Date();

            const worker = models.Worker();
            worker.msg = msg;
            worker.state = state;

            worker.save();

            return worker;
        },
        fetch: function(state) {
            return new Promise((res, rej) => {
                models.Worker.find({ 
                    'state.name': state 
                }, function(err, workers) {
                    if (err) {
                        return rej(err);
                    }

                    return res(workers);
                })
            })
        },
        fetchById: function(id) {
            return new Promise((res, rej) => {
                models.Worker.findById(id, function(err, worker) {
                    if (err) {
                        return rej(err);
                    }

                    return res(worker);
                })
            })
        },
        update: function(workerID, newState) {
            return new Promise((res, rej) => {
                models.Worker.findById(workerID, function(err, worker) {
                    if (err) {
                        return rej(err);
                    }

                    worker.prevState.push(worker.state);

                    const state = models.State();
                    state.name = newState;
                    state.tstamp = new Date();

                    worker.state = state;

                    worker.save();

                    return res(worker);
                }) 
            })
        }
    }
}