/**
 * File: project.model
 * Author: AKSHIKA.CHOUDHARY
 * Date: 12-05-2024
 */
import { DataTypes, Model, Sequelize } from 'sequelize';
import { SURVEY_STATUS } from '../common/constants';

export const ProjectModel = (sequelize: Sequelize) => {
  class Project extends Model {}

  Project.init(
    {
      project_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      project_name: {
        type: DataTypes.STRING(30),
        defaultValue: false,
      },
      project_address: {
        type: DataTypes.STRING(200),
        defaultValue: false,
      },
      image_name: {
        type: DataTypes.STRING(1000),
        defaultValue: false,
      },
      position: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      project_type: {
        type: DataTypes.STRING(10),
        defaultValue: false,
      },
      project_status: {
        type: DataTypes.STRING(20),
        defaultValue: false,
      },
      google_ff_url: {
        type: DataTypes.STRING(255),
      },
      google_ff_vhospitality_url: {
        type: DataTypes.STRING(255),
      },
      enable_electric_car_module: {
        type: DataTypes.STRING(3),
        defaultValue: false,
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
      survey_status: {
        defaultValue: 'DISABLE',
        type: DataTypes.ENUM(...Object.values(SURVEY_STATUS)),
      },
    },
    {
      sequelize,
      tableName: 'tbl_project',
      underscored: true,
      paranoid: true,
    },
  );
  return Project;
};
