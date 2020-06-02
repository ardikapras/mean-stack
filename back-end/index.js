require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors')

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(express.json());
app.use(cors());

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(3000, function () {
  console.log('listening on 3000')
})