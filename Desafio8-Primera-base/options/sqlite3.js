var path = require('path')
var options = {
  client: "sqlite3",
  connection: {
//    filename: "./db/ecommerce.sqlite",
    filename: path.join(__dirname, '..', 'db', 'ecommerce.sqlite'),
  },
  useNullAsDefault: true,
};

module.exports = { options };
