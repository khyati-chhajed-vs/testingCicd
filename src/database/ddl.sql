-- vianaar2022.configuration definition

CREATE TABLE `configuration` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE tbl_appt_reg_data ADD image_url VARCHAR(200) NULL;

-- Added this insert statement to ensure that there is an entry in the cleaning_type table where 
-- cleaning_type_id is 0, as we need to handle cases where a default cleaning type is required.
-- This helps in scenarios where the cleaning_type_id is not specified (e.g., NULL or 0) and 
-- allows the application to assign a default cleaning type.
INSERT INTO tbl_cleaning_type (name,status,`position`,add_ip,add_time,add_by,update_ip,update_time,update_by,notification_active,total_days) VALUES
	 ('Cleaning','DELETE',0,'103.62.238.98','2023-12-06 15:34:11','admin',NULL,NULL,NULL,0,0);
ALTER TABLE vi2020.tbl_airport_pickup MODIFY COLUMN re_assign_time datetime NULL;
ALTER TABLE vi2020.tbl_airport_pickup MODIFY COLUMN reassign_estate_manager_time datetime NULL;
ALTER TABLE vianaar2022.tbl_laundry_requests MODIFY COLUMN reassign_estate_manager_id int NULL;
ALTER TABLE vianaar2022.tbl_laundry_requests MODIFY COLUMN reassign_estate_manager_time datetime NULL;
ALTER TABLE vianaar2022.tbl_laundry_requests MODIFY COLUMN re_assign_to int NULL;
ALTER TABLE vianaar2022.tbl_laundry_requests MODIFY COLUMN re_assign_time datetime NULL;
ALTER TABLE vianaar2022.tbl_laundry_requests MODIFY COLUMN view_status tinyint DEFAULT 0 NULL;

ALTER TABLE vianaar2022.tbl_site_visit_requests MODIFY COLUMN reassign_estate_manager_id int NULL;
ALTER TABLE vianaar2022.tbl_site_visit_requests MODIFY COLUMN reassign_estate_manager_time datetime NULL;
ALTER TABLE vianaar2022.tbl_site_visit_requests MODIFY COLUMN re_assign_to int NULL;
ALTER TABLE vianaar2022.tbl_site_visit_requests MODIFY COLUMN re_assign_time datetime NULL;


CREATE TABLE vianaar_dev.tbl_cleaning_images (
	id BIGINT auto_increment NOT NULL,
	app_reg_data_id BIGINT NULL,
	image_url VARCHAR(200) NULL,
	CONSTRAINT tbl_cleaning_images_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE vianaar_dev.tbl_rental_request ADD location varchar(100) NULL;
ALTER TABLE vianaar_dev.tbl_rental_request ADD no_of_guests INT NULL;
ALTER TABLE vianaar_dev.tbl_rental_request MODIFY COLUMN id int unsigned auto_increment NOT NULL;
ALTER TABLE vianaar_dev.tbl_rental_request ADD CONSTRAINT tbl_rental_request_pk PRIMARY KEY (id);
ALTER TABLE vianaar_dev.tbl_rental_request MODIFY COLUMN id int unsigned auto_increment NOT NULL;
ALTER TABLE tbl_teams ADD phone_number VARCHAR(200) NULL;

ALTER TABLE vianaar_dev.tbl_feedback_submitting ADD CONSTRAINT tbl_feedback_submitting_pk PRIMARY KEY (id);
ALTER TABLE vianaar_dev.tbl_feedback_submitting MODIFY COLUMN id int unsigned auto_increment NOT NULL;
ALTER TABLE vianaar_dev.tbl_feedback_submitting_answer ADD CONSTRAINT tbl_feedback_submitting_answer_pk PRIMARY KEY (id);
ALTER TABLE vianaar_dev.tbl_feedback_submitting_answer MODIFY COLUMN id int auto_increment NOT NULL;
ALTER TABLE vianaar_dev.tbl_project ADD is_survey_enabled BOOL DEFAULT false NULL;
ALTER TABLE tbl_teams ADD phone_number VARCHAR(200) NULL;

ALTER TABLE vianaar_dev.tbl_notifications_users ADD notification_type INTEGER NOT NULL;
ALTER TABLE vianaar_dev.tbl_notifications_users ADD read_status BOOLEAN NOT NULL;
ALTER TABLE vianaar_dev.tbl_complaint_requests ADD escalate_counter INTEGER NOT NULL DEFAULT 0;
ALTER TABLE vianaar_dev.tbl_notifications_users ADD survey_status ENUM('ENABLE', 'DISABLE', 'COMPLETED') NOT NULL DEFAULT 'DISABLE';


INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('android_min_version', '1.0.0', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('android_max_version', '1.0.0', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('ios_min_version', '1.0.0', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('ios_max_version', '1.0.0', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('furnish_my_property_url', 'xyz.com', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('sustainainbility_url', 'www.sustainibilty.com', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('bluekite_url', 'https://www.thebluekite.com/', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('airport_prior_booking_time', '72', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('block_date_prior_booking_time', '72', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('laundary_service_time', '24', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('laundary_disclaimer', 'Laundary service would take atleast 36 hours', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('site_visit_disclaimer', 'Request for Site visit needs to happen 48 hours prior to arrival', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('block_date_disclaimer', 'Request for booking needs to happen 72 hours prior to arrival', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('airport_disclaimer', 'Booking needs to happen 72 hours prior to arrival', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('site_visit_prior_booking_time', '48', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('pre_hamburger_menu', '["My Projects", "Site Visit Request", "Change password", "Logout", "Profile", "Book a Stay", "Welcome Video"]', NOW(), NOW());
INSERT INTO tbl_configuration (`key`, `value`, created_at, updated_at) VALUES ('post_hamburger_menu', '["Welcome Video","Change password", "Logout", "Profile", "Team", "Sustainability"]', NOW(), NOW());

ALTER TABLE vianaar_dev.tbl_user_projects ADD survey_status varchar(100) DEFAULT 'DISABLE' NOT NULL;
ALTER TABLE vianaar_dev.tbl_user_projects ADD survey_postpone_count INTEGER DEFAULT 0 NOT NULL;
ALTER TABLE vianaar_dev.tbl_user_projects ADD is_welcome_video_watched BOOLEAN DEFAULT 0 NOT NULL;'{
      "account_update": true,
      "document_update": true,
      "vianaar_support": true,
      "payment_update": true,
      "my_maintenance": true,
      "revenue": true
    }'

ALTER TABLE vianaar_dev.tbl_airport_pickup ADD airport varchar(200) DEFAULT null NOT NULL;

CREATE TABLE tbl_furnish_property (
    id bigint NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    project_id VARCHAR(255) NOT NULL,
    unit_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
    PRIMARY KEY (`id`)
);

ALTER TABLE vianaar_dev.tbl_complaint_requests ADD file_url varchar(500) NULL;
ALTER TABLE vianaar_dev.tbl_complaint_requests ADD escalation_description TEXT NULL;
ALTER TABLE vianaar_dev.tbl_complaint_requests ADD is_escalated TINYINT NULL;

ALTER TABLE vianaar_dev.tbl_recommendations ADD location_url varchar(500) NULL;

ALTER TABLE vianaar_dev.tbl_book_speedboat_order ADD number_of_pax INT NOT NULL;

-- vianaar_dev.tbl_furnish_property definition
CREATE TABLE `tbl_furnish_property` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `project_id` varchar(255) NOT NULL,
  `unit_id` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- vianaar_dev.tbl_customer_testimonial definition

CREATE TABLE `tbl_customer_testimonial` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `project_id` bigint NOT NULL,
  `unit_id` bigint NOT NULL,
  `rating` int NOT NULL,
  `review` text,
  `add_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;