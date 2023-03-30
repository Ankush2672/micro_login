module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pincode: {
        type: DataTypes.STRING,
        allowNull: true
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      created_date : {
        type: DataTypes.DATE
      }
    }
  );
  return users;
};

