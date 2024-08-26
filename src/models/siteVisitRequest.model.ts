/**
 * File: siteVisitRequest.model
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 31-05-2024
 * Description: Sequelize model for tbl_site_visit_request
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

import { APPLICATION_NAME, REQUEST_STATUS, STATUS } from '../common/constants';

export const SiteVisitRequestModel = (sequelize: Sequelize) => {
  class SiteVisitRequest extends Model {}

  SiteVisitRequest.init(
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
      caretaker_id: {
        type: DataTypes.BIGINT,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      mobile: {
        type: DataTypes.STRING,
      },
      request_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      request_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      comments: {
        type: DataTypes.TEXT,
      },
      admin_comments: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: STATUS.ACTIVE,
      },
      request_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: REQUEST_STATUS.NOT_STARTED,
      },
      add_ip: {
        type: DataTypes.STRING(100),
      },
      add_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      add_by: {
        type: DataTypes.STRING(100),
        defaultValue: APPLICATION_NAME,
      },
      update_ip: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      update_time: {
        type: DataTypes.DATE,
      },
      update_by: {
        type: DataTypes.STRING(100),
      },
      deleted_by: {
        type: DataTypes.STRING(100),
      },
      reassign_estate_manager_id: {
        type: DataTypes.BIGINT,
      },
      reassign_estate_manager_time: {
        type: DataTypes.DATE,
      },
      re_assign_to: {
        type: DataTypes.BIGINT,
      },
      re_assign_time: {
        type: DataTypes.DATE,
      },
      tat_twenty_four: {
        type: DataTypes.DATE,
      },
      tat_forty_eight: {
        type: DataTypes.DATE,
      },
      extend_date: {
        type: DataTypes.DATE,
      },
      view_status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'tbl_site_visit_requests',
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );
  return SiteVisitRequest;
};
