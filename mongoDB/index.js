
// =================================================================
// Config mongoose ====================================================
// =================================================================

//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = 'mongodb://zayro:zayro2019@ds243054.mlab.com:43054/sib219';

mongoose.connect(mongoDB, { useUnifiedTopology: true, useCreateIndex: true,  useNewUrlParser: true }).then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Error connecting to database', error);
    });

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = { db };