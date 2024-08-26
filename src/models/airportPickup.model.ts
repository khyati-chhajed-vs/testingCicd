/**
 * File: airportPickup.model
 * Author: manoj.fulara@vectoscalar.com
 * Date: 31-05-2024
 * Description: Sequelize model for tbl_airport_pickup
 */

import { DataTypes, Model, Sequelize } from 'sequelize';
import { REQUEST_STATUS } from '../common/constants';

export const AirportPickupModel = (sequelize: Sequelize) => {
  class AirportPickup extends Model {}

  AirportPickup.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      caretaker_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      unit_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      request_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      request_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      airport_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      number_of_pax: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      number_of_luggage: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      accept_terms: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      admin_comments: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'ACTIVE',
      },
      request_status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: REQUEST_STATUS.NOT_STARTED,
      },
      add_ip: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      add_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      add_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      update_ip: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      update_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      update_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      deleted_by: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
      },
      reassign_estate_manager_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      reassign_estate_manager_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      re_assign_to: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      re_assign_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      tat_twenty_four: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tat_forty_eight: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      extend_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      view_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'tbl_airport_pickup',
      timestamps: false,
      underscored: false,
    },
  );
  return AirportPickup;
};
