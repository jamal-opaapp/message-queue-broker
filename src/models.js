
module.exports = function(mongoose) {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const State = new Schema({
    name: { type: String, index: true },
    tstamp: Date
  });
  
  const Worker = new Schema({
    id: ObjectId,
    msg: String,
    prevState: [ State ],
    state: State 
  })

  const models = {
    State: mongoose.model('State', State),
    Worker: mongoose.model('Worker', Worker)
  }

  return models;
}
