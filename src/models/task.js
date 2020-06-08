
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    title: DataTypes.STRING,
  });

  Tasks.associate = function (models) {
    models.Tasks.belongsTo(models.Users, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Tasks;
};
