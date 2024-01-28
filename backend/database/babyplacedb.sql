CREATE DATABASE IF NOT EXISTS babyplace; 

USE babyplace; 


CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_nursery BOOLEAN,
    unique(email)
);

CREATE TABLE parent (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
    phone VARCHAR(12) NOT NULL,
    avatar_upload_id INT
);

CREATE TABLE children (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    is_walking BOOLEAN NOT NULL,
    doctor VARCHAR(100) NOT NULL,
    allergies TEXT
);

CREATE TABLE nursery (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(12) NOT NULL,
    picture_upload_id INT,
    description TEXT NOT NULL,
    outdoor_space BOOLEAN,
    homemade_meals BOOLEAN,
    developmental_activities BOOLEAN,
    musical_activities BOOLEAN
);

CREATE TABLE administrative (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    social_security_number VARCHAR(15) NOT NULL,
    income_proof_upload_id INT,
    photo_video_permission_upload_id INT,
    outing_permission_upload_id INT
);

CREATE TABLE booking (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY
);

ALTER TABLE booking
ADD COLUMN children_id INT,
ADD CONSTRAINT fk_booked_children
    FOREIGN KEY (children_id)
    REFERENCES children(id);

ALTER TABLE booking
ADD COLUMN nursery_id INT,
ADD CONSTRAINT fk_booking_nursery
    FOREIGN KEY (nursery_id)
    REFERENCES nursery(id);


ALTER TABLE children
ADD COLUMN parent_id INT,
ADD CONSTRAINT fk_parent_id
    FOREIGN KEY (parent_id)
    REFERENCES parent(id);

ALTER TABLE parent
ADD COLUMN administrative_id INT,
ADD CONSTRAINT fk_administrative_id
    FOREIGN KEY (administrative_id)
    REFERENCES administrative(id);


ALTER TABLE parent
ADD COLUMN user_id INT,
ADD CONSTRAINT fk_parent_user
    FOREIGN KEY (user_id)
    REFERENCES user(id);


ALTER TABLE nursery
ADD COLUMN user_id INT,
ADD CONSTRAINT fk_nursery_user
    FOREIGN KEY (user_id)
    REFERENCES user(id);

ALTER TABLE nursery
ADD COLUMN capacity INT NOT NULL,
ADD COLUMN time_slot VARCHAR(255) NOT NULL;


CREATE TABLE date (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    start_date DATETIME,
    end_date DATETIME,
    FOREIGN KEY (booking_id) REFERENCES booking(id)
);



 CREATE TABLE upload ( 
  id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  url varchar(255) NOT NULL
);
