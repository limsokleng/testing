
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
  });

  Users.associate = function (models) {
    models.Users.hasMany(models.Tasks, { onDelete: 'cascade' });
  };

  return Users;
};
