import { DataTypes, Model, Sequelize } from 'sequelize';

export const VcareUserModel = (sequelize: Sequelize) => {
  class VCareUser extends Model {}

  VCareUser.init(
    {
      caretaker_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      add_ip: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      add_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      update_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      update_ip: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      meta_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      meta_keyword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      meta_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      device_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      device_registration_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quickblox_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      responsibilities: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      force_logout: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      google_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gmail_refresh_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gmail_access_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gmail_pending_fetch_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_email_gmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        primaryKey: true,
      },
      mobile: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 'MOBILE',
      },
    },
    {
      sequelize,
      tableName: 'tbl_caretaker',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );

  return VCareUser;
};
