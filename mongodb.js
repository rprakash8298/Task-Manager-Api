const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const connectUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// console.log(id.getTimestamp())
mongoClient.connect(connectUrl, { useNewUrlParser: true, useUnifiedTopology:true }, (error, client) => {
    if (error) {
        return console.log('unable to connect to database')
    }
    const db = client.db(databaseName)
    db.collection('users').deleteMany({
        description:'challenge 2'
    }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
    db.collection('users').deleteOne({
        _id:new ObjectID("5fa8c02c28d21b0b74423e88")
    }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
       
})