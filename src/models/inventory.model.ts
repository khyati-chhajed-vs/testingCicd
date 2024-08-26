/**
 * File: inventory.model
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 12-07-2024
 * Description: Sequlize modelfor tbl_inventory
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const InventoryModel = (sequelize: Sequelize) => {
  class Inventory extends Model {}

  Inventory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      item_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      old_item_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      add_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      comment_add_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      update_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tbl_inventory',
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );
  return Inventory;
};
