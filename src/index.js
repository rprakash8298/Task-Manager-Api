const express = require('express')
require('./db/mongoose')

const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')
const app = express()

const port = process.env.PORT 

// app.use((req, res, next) => {
//         res.status(503).send('server is under maintanace, come back soon')
    
// })
    
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('app running ' + port)
})

