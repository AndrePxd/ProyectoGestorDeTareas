const app = require("./app");
const sequelize = require("./config/database");
require("dotenv").config();
require("./models/user");
require("./models/task");

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
});
