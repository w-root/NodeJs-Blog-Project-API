const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config();

const PostRouter = require('./Routes/PostRouter')
const AuthRouter = require('./Routes/AuthRouter')
const TagRouter = require('./Routes/TagRouter')
const UserRouter = require('./Routes/UserRouter')

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/auth', AuthRouter)
app.use('/posts', PostRouter)
app.use('/tag', TagRouter)
app.use('/user', UserRouter)


const port = process.env.PORT
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Veritabanına bağlandı"))
    .catch(err => console.log(err))

app.listen(port, () => {
    console.log(`Server is running !`)
})
