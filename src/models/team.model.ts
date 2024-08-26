/**
 * File: team.model
 * Author: AKSHIKA.CHOUDHARY
 * Date: 21-05-2024
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const TeamModel = (sequelize: Sequelize) => {
  class Team extends Model {}

  Team.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ACTIVE',
      },
      add_ip: {
        type: DataTypes.STRING(30),
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
        defaultValue: null,
      },
      update_time: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      update_by: {
        type: DataTypes.STRING(20),
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: 'tbl_teams',
      timestamps: false,
      underscored: true,
    },
  );
  // Team.sync({alter:true})
  return Team;
};
