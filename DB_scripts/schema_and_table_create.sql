CREATE SCHEMA `movies` ;

CREATE TABLE `movies`.`user` (
  `id` INT NOT NULL,
  `seat_id` JSON NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `movies`.`seats` (
  `id` INT NOT NULL,
  `seat_number` INT NOT NULL,
  `reserved` TINYINT NULL,
  `booked` TINYINT NULL,
  PRIMARY KEY (`id`));
