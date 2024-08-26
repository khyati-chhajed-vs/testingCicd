/**
 * File: catamaran.model
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 11-06-2024
 * Description: Sequelize model for tbl_book_speedboat_order
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const CatamaranModel = (sequelize: Sequelize) => {
  class Catamaran extends Model {}
  Catamaran.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      booking_no: {
        type: DataTypes.STRING,
      },
      booking_no_payu: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      caretaker_id: {
        type: DataTypes.INTEGER,
      },
      project_id: {
        type: DataTypes.INTEGER,
      },
      number_of_pax: {
        type: DataTypes.INTEGER,
      },
      unit_id: {
        type: DataTypes.INTEGER,
      },
      book_in_date: {
        type: DataTypes.DATEONLY,
      },
      cost: {
        type: DataTypes.FLOAT,
      },
      slot_id: {
        type: DataTypes.INTEGER,
      },
      book_in_time: {
        type: DataTypes.TIME,
      },
      boat_qty: {
        type: DataTypes.INTEGER,
      },
      boat_duration: {
        type: DataTypes.STRING,
      },
      from_time: {
        type: DataTypes.TIME,
      },
      to_time: {
        type: DataTypes.TIME,
      },
      comments: {
        type: DataTypes.STRING,
      },
      admin_comments: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      request_status: {
        type: DataTypes.STRING,
      },
      payment_status: {
        type: DataTypes.STRING,
      },
      payu_response: {
        type: DataTypes.TEXT,
      },
      add_ip: {
        type: DataTypes.STRING,
      },
      add_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      add_by: {
        type: DataTypes.STRING,
      },
      update_ip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      update_time: {
        type: DataTypes.DATE,
      },
      update_by: {
        type: DataTypes.STRING,
      },
      deleted_by: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'tbl_book_speedboat_order',
      timestamps: false,
    },
  );

  return Catamaran;
};
