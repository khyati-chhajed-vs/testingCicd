/**
 * File: complaint.model
 * Author:  Akshika.Choudhary
 * Date: 14-06-2024
 * Description: Sequelize model for tbl_complaint_requests
 */

import { DataTypes, Model, Sequelize } from 'sequelize';
import { REQUEST_STATUS, STATUS } from '../common/constants';

export const ComplaintModel = (sequelize: Sequelize) => {
  class Complaint extends Model {}

  Complaint.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      caretaker_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      request_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: new Date(),
      },
      request_time: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: new Date(),
      },
      complaint_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      location_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      complaint_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      complaint_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      issue_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      issue_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      admin_comments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: STATUS.ACTIVE,
      },
      file_url: {
        type: DataTypes.STRING,
      },
      request_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: REQUEST_STATUS.NOT_STARTED,
      },
      add_ip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      add_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      add_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      update_ip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      update_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      update_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deleted_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reassign_estate_manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reassign_estate_manager_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      re_assign_to: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      re_assign_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      tat_twenty_four: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      tat_forty_eight: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      extend_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      tat_seventy_two: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      tat_one_twenty: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      view_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      invoice_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_escalated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      escalation_description: {
        type: DataTypes.STRING,
      },
      escalate_counter: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'tbl_complaint_requests',
      timestamps: false,
    },
  );
  return Complaint;
};
