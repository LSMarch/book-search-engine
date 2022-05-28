const mongoose = require('mongoose');
//mongodb://localhost/googlebooks
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/book', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
