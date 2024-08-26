import { DataTypes, Model, Sequelize } from 'sequelize';

export const UserModel = (sequelize: Sequelize) => {
  class User extends Model {}

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firebase_user_id: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      create_status: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      error_description: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },

      user_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'USER',
      },
      username: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: '0000-00-00',
      },
      user_email: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      user_mobile: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      user_phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      user_address: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      user_project: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      project_unit: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      speed_boat: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'NO',
      },
      check_in: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'YES',
      },
      grocery: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'YES',
      },
      request_uc: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'YES',
      },
      special_requests: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'YES',
      },
      transport: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'YES',
      },
      progress_image: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'YES',
      },
      device_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
      },
      device_registration_id: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: '',
      },
      url_key: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      electric_cars: {
        type: DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'YES',
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      update_ip: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      update_by: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      update_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      meta_title: {
        type: DataTypes.STRING(100),
        defaultValue: '',
      },
      meta_keyword: {
        type: DataTypes.STRING(350),
        allowNull: false,
        defaultValue: '',
      },
      meta_description: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: '',
      },
      quickblox_user_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
      },
      welcome_videos_completed: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      welcome_videos_ongoing: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      notification_settings: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {
          account_update: true,
          document_update: true,
          vianaar_support: true,
          payment_update: true,
          my_maintenance: true,
          revenue: true,
        },
      },
    },
    {
      sequelize,
      tableName: 'tbl_user',
      timestamps: false,
      underscored: false,
    },
  );
  return User;
};
