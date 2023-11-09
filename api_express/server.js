const express = require('express');
const cors = require('cors')

let DB = require('./db.config')

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))


const user_router = require('./routes/users')
const ticket_router = require('./routes/tickets')

app.use('/users', user_router)
app.use('/tickets', ticket_router)

app.get('/', (req,res) => res.send('Welcome !'));
app.get('*',(req,res) => res.status(501).send('existe pas'))

DB.authenticate()
    .then(() => console.log('Database connection OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () =>{
            console.log(`Server on port ${process.env.SERVER_PORT} Have fun !`)
          })
    })
    .catch(err => console.log('Database error', err))