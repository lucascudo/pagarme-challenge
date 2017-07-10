'use strict';

const Purchase = (DB, Sequelize) =>
  DB.define('purchase', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    pokemon_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    card_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    card_expiration_date: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    card_holder_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    card_cvv: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });


module.exports = Purchase;
