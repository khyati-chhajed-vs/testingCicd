/**
 * File: document.model
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 31-05-2024
 * Description: Sequelize model for tbl_document
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const DocumentModel = (sequelize: Sequelize) => {
  class Document extends Model {}

  Document.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
      },
      app_user_id: {
        type: DataTypes.BIGINT,
      },
      category_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
      },
      file: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING(10),
      },
      add_ip: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      add_time: {
        type: DataTypes.DATE,
      },
      add_by: {
        type: DataTypes.STRING(100),
      },
      update_ip: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      update_time: {
        type: DataTypes.DATE,
      },
      update_by: {
        type: DataTypes.STRING(100),
      },
    },
    {
      sequelize,
      tableName: 'tbl_documents',
      paranoid: true,
      timestamps: false,
    },
  );
  return Document;
};
