CREATE DATABASE IF NOT EXISTS babyplace; 

USE babyplace; 

CREATE TABLE user (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(12) NOT NULL
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
    phone_number VARCHAR(12) NOT NULL,
    picture_url TEXT NOT NULL,
    description TEXT NOT NULL,
    outdoor_space BOOLEAN NOT NULL,
    homemade_meals BOOLEAN NOT NULL,
    developmental_activities BOOLEAN NOT NULL,
    hygiene_products_provided BOOLEAN NOT NULL,
    musical_activities BOOLEAN NOT NULL
);

CREATE TABLE administrative_record (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    social_security_number VARCHAR(15) NOT NULL,
    income_proof_url TEXT NOT NULL,
    photo_video_permission_url TEXT NOT NULL,
    outing_permission_url TEXT NOT NULL
);

CREATE TABLE booking (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    booking_at DATETIME NOT NULL
);

ALTER TABLE children
ADD COLUMN user_id INT,
ADD CONSTRAINT fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES user(id);

ALTER TABLE user
ADD COLUMN administrative_record_id INT,
ADD CONSTRAINT fk_administrative_record_id
    FOREIGN KEY (administrative_record_id)
    REFERENCES administrative_record(id);

CREATE TABLE user_booking (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    booking_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (booking_id) REFERENCES booking(id)
);

CREATE TABLE user_nursery (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    nursery_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (nursery_id) REFERENCES nursery(id)
);

CREATE TABLE nursery_booking (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nursery_id INT NOT NULL,
    booking_id INT NOT NULL,
    FOREIGN KEY (nursery_id) REFERENCES nursery(id),
    FOREIGN KEY (booking_id) REFERENCES booking(id)
);
