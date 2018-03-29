const todayDate = new Date().toISOString().slice(0,10);

const TransactionModel = function (sequelize, DataTypes) {
  const Transaction = sequelize.define('Transactions', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    day: {
      type: DataTypes.DATEONLY,
      defaultValue: todayDate,
      unique: true,
      validate: {
        not: ["[a-z]",'i'],
        isDate: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Class method
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Users, {
      onDelete: 'CASCADE',
      foreignKey: 'userId',
    });
  };
  return Transaction;
};

export default TransactionModel
