/**
 * File: bookAStay.model
 * Author: MANOJ.FULARA@VECTOSCALAR.COM
 * Date: 06-06-2024
 * Description:Sequelize model for tbl_rental_request
 */

import { DataTypes, Model, Sequelize } from 'sequelize';
import { REQUEST_STATUS } from '../common/constants';

export const BookAStayModel = (sequelize: Sequelize) => {
  class BookAStay extends Model {}

  BookAStay.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      user_full_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      user_email: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      user_mobile: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      caretaker_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      project_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      unit_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      unit_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      check_in_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      check_out_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      type_of_unit: {
        type: DataTypes.STRING(100),
        allowNull: true,
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
      location: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      no_of_guests: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tbl_rental_request',
      timestamps: false,
      underscored: false,
    },
  );
  return BookAStay;
};
