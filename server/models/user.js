import bcrypt from 'bcrypt';


const UserModel = function (sequelize, DataTypes) {
  const User = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },
    },
  });

  // Class method
  User.associate = (models) => {
    User.hasMany(models.Transactions, {
      onDelete: 'CASCADE',
      foreignKey: 'userId',
    });
  };

  // Instance methods
  User.prototype.hashPassword = function hashPassword() {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(9));
    return this.password;
  };

  User.prototype.validPassword = function validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};

export default UserModel
