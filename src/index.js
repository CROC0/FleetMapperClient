const app = require('./app');
const db = require('./db');

require('dotenv').config();

const port = process.env.PORT || 2000;

// Try to connect to Snowflake, and check whether the connection was successful.
db.connect(function (err, conn) {
  if (err) {
    console.error('Unable to connect: ' + err.message);
  } else {
    console.log('Successfully connected to Snowflake.');

    app.set('db', conn);

    app.listen(port, () => {
      console.log(`API is now running on http://localhost:${port}`);
    });
  }
});
