const mongoose = require('mongoose');

// Changed database name from 'googlebooks'
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/book_search', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
