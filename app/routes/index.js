const userRoutes = require('./joygram_routes');
module.exports = function(app, db) {
  userRoutes(app, db);
}
