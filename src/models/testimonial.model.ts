/**
 * File: testimonial.model
 * Author: khyati.chhajed@vectoscalar.com
 * Date: 23-07-2024
 * Description: Sequelize model for tbl_customer_testimonial
 */

import { DataTypes, Model, Sequelize } from 'sequelize';

export const TestimonialModel = (sequelize: Sequelize) => {
  class Testimonial extends Model {}

  Testimonial.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      add_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'tbl_customer_testimonial',
      timestamps: false,
      underscored: true,
      paranoid: true,
    },
  );
  return Testimonial;
};
