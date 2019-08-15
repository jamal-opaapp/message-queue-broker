The purpose of this project is to serve as an external queue to track the state of messages in order to ensure consistent messaage delivery

## API

### GET /?id=<WORKER_ID>
Fetches the worker, along with it's state and other information, associated with the id

### GET /worker/:state
Fetches all workers whose state matches. E.g. - new

### POST / -h Content-Type: application/json -d '{"msg": "this is a test"}'
Returns the newly created worker, whose msg attribute matches the message in the payload

### PUT / -h Content-Type: application/json -d '{"id": "<workerID>", "state": "<newState>}
Returns the newly modified worker
