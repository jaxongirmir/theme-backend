const express = require('express')
const cors = require('cors')
const { connect } = require('mongoose')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to Database'))
  .catch(() => console.log('Not connected to Database'))

app.get('/', (req, res) => {
  res.send('App is running')
})

// END-POINTS
const theme = require('./routes/theme')
const user = require('./routes/user')

app.use('/api/v1', theme)
app.use('/api/v1', user)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
