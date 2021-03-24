const snowflake = require('snowflake-sdk');

const connection = snowflake.createConnection({
  account: 'wn74261.ap-southeast-2',
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  warehouse: 'WH_BA_ASSETS_HME',
  database: 'SBX_BA_ASSETS_HME',
  schema: 'MASTER_DATA',
});

module.exports = connection;
