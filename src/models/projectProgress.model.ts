/**
 * File: projectProgress.model
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 11-06-2024
 * Description:Sequelize model for table tbl_project_progress
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const ProjectProgressModel = (sequelize: Sequelize) => {
  class ProjectProgress extends Model {}

  ProjectProgress.init(
    {
      progress_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      unit_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      project_id_old: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      progress_date: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      position: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING(10),
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
      },
      update_by: {
        type: DataTypes.STRING(100),
      },
      update_time: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: 'tbl_project_progress',
      underscored: false,
    },
  );
  return ProjectProgress;
};
