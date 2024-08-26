/**
 * File: teamProject.model
 * Author: AKSHIKA.CHOUDHARY
 * Date: 21-05-2024
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const TeamProjectsModel = (sequelize: Sequelize) => {
  class TeamProjects extends Model {}

  TeamProjects.init(
    {
      teams_project_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      teams_id: {
        type: DataTypes.BIGINT,
        defaultValue: null,
      },
      project_id: {
        type: DataTypes.BIGINT,
        defaultValue: null,
      },
      add_ip: {
        type: DataTypes.STRING(20),
      },
      add_by: {
        type: DataTypes.STRING(50),
      },
      add_time: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: 'tbl_teams_projects',
      timestamps: false,
      underscored: true,
    },
  );
  return TeamProjects;
};
