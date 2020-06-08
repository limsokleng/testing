const models = require('../models');

const clearDB = async () => {
  try {
     await models.sequelize.query("DELETE FROM \"Users\" CASCADE;");
     await models.sequelize.query("DELETE FROM \"Tasks\" CASCADE");
    
   }catch(err) {
     console.error(err);
  }
  console.log(new Date());
}

module.exports = clearDB;
