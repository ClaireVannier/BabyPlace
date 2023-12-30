CREATE DATABASE IF NOT EXISTS babyplace; 

USE babyplace; 


CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    email VARCHAR(100) NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE parent (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
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
    phone VARCHAR(12) NOT NULL,
    picture_url TEXT NOT NULL,
    description TEXT NOT NULL,
    outdoor_space BOOLEAN NOT NULL,
    homemade_meals BOOLEAN NOT NULL,
    developmental_activities BOOLEAN NOT NULL,
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
    booked_at DATETIME NOT NULL
);

-- Ajouter une clé étrangère pour référencer la table "children"
ALTER TABLE booking
ADD COLUMN children_id INT,
ADD CONSTRAINT fk_booked_children
    FOREIGN KEY (children_id)
    REFERENCES children(id);

-- Ajouter une clé étrangère pour référencer la table "nursery"
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
ADD COLUMN administrative_record_id INT,
ADD CONSTRAINT fk_administrative_record_id
    FOREIGN KEY (administrative_record_id)
    REFERENCES administrative_record(id);

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

