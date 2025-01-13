-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ssafyhome
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ssafyhome
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ssafyhome` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ssafyhome` ;

-- -----------------------------------------------------
-- Table `ssafyhome`.`member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`member` (
  `member_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `dir_name` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `last_login` DATETIME(6) NULL DEFAULT NULL,
  `member_role` ENUM('ADMIN', 'AGENT', 'MASTER', 'USER') NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `nickname` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `social_login_id` VARCHAR(255) NOT NULL,
  `social_type` ENUM('GOOGLE', 'KAKAO', 'NAVER', 'NONE') NULL DEFAULT NULL,
  `status` ENUM('ACTIVE', 'DELETED', 'DORMANT') NULL DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE INDEX `UKhh9kg6jti4n1eoiertn2k6qsc` (`nickname` ASC) VISIBLE,
  UNIQUE INDEX `UKaxh1w932isk1nv7ddkxseeswe` (`social_login_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`question` (
  `question_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `member_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  INDEX `FK1nuuke7olg7b9fkyp2ba9d5bx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FK1nuuke7olg7b9fkyp2ba9d5bx`
    FOREIGN KEY (`member_id`)
    REFERENCES `ssafyhome`.`member` (`member_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`answer` (
  `answer_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `question_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`answer_id`),
  UNIQUE INDEX `UKeix9du6u2r4wxwu415wq8yb99` (`question_id` ASC) VISIBLE,
  CONSTRAINT `FK8frr4bcabmmeyyu60qt7iiblo`
    FOREIGN KEY (`question_id`)
    REFERENCES `ssafyhome`.`question` (`question_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`region` (
  `created_at` DATETIME(6) NOT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `region_id` BIGINT NOT NULL AUTO_INCREMENT,
  `dong` VARCHAR(255) NOT NULL,
  `gugun` VARCHAR(255) NOT NULL,
  `sido` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`region_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 20552
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`house`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`house` (
  `build_year` BIGINT NOT NULL,
  `created_at` DATETIME(6) NOT NULL,
  `house_id` BIGINT NOT NULL AUTO_INCREMENT,
  `modified_at` DATETIME(6) NOT NULL,
  `region_id` BIGINT NULL DEFAULT NULL,
  `bonbun` VARCHAR(255) NOT NULL,
  `bubun` VARCHAR(255) NOT NULL,
  `dir_name` VARCHAR(255) NULL DEFAULT NULL,
  `jibun` VARCHAR(255) NOT NULL,
  `latitude` VARCHAR(255) NOT NULL,
  `longitude` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `road` VARCHAR(255) NOT NULL,
  `type` ENUM('APT', 'DETACHED', 'VILLA') NOT NULL,
  PRIMARY KEY (`house_id`),
  INDEX `FK29m9jtj6x045o61x8r1xh3n3e` (`region_id` ASC) VISIBLE,
  CONSTRAINT `FK29m9jtj6x045o61x8r1xh3n3e`
    FOREIGN KEY (`region_id`)
    REFERENCES `ssafyhome`.`region` (`region_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 39310
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`article` (
  `article_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `dir_name` VARCHAR(255) NULL DEFAULT NULL,
  `house_id` BIGINT NULL DEFAULT NULL,
  `member_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  INDEX `FK1wlhpk296r0jsxysc3vbgwj03` (`house_id` ASC) VISIBLE,
  INDEX `FK6l9vkfd5ixw8o8kph5rj1k7gu` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FK1wlhpk296r0jsxysc3vbgwj03`
    FOREIGN KEY (`house_id`)
    REFERENCES `ssafyhome`.`house` (`house_id`),
  CONSTRAINT `FK6l9vkfd5ixw8o8kph5rj1k7gu`
    FOREIGN KEY (`member_id`)
    REFERENCES `ssafyhome`.`member` (`member_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`comment` (
  `comment_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `article_id` BIGINT NULL DEFAULT NULL,
  `member_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `FK5yx0uphgjc6ik6hb82kkw501y` (`article_id` ASC) VISIBLE,
  INDEX `FKmrrrpi513ssu63i2783jyiv9m` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FK5yx0uphgjc6ik6hb82kkw501y`
    FOREIGN KEY (`article_id`)
    REFERENCES `ssafyhome`.`article` (`article_id`),
  CONSTRAINT `FKmrrrpi513ssu63i2783jyiv9m`
    FOREIGN KEY (`member_id`)
    REFERENCES `ssafyhome`.`member` (`member_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`deal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`deal` (
  `deposit` INT NULL DEFAULT NULL,
  `exclusive_area` DECIMAL(38,2) NOT NULL,
  `floor` INT NOT NULL,
  `price` INT NOT NULL,
  `created_at` DATETIME(6) NOT NULL,
  `deal_date` DATETIME(6) NULL DEFAULT NULL,
  `deal_id` BIGINT NOT NULL AUTO_INCREMENT,
  `house_id` BIGINT NULL DEFAULT NULL,
  `member_id` BIGINT NULL DEFAULT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `dir_name` VARCHAR(255) NULL DEFAULT NULL,
  `status` ENUM('COMPLETED', 'PENDING') NULL DEFAULT NULL,
  `type` ENUM('MONTHLY_RENT', 'RENT', 'SALE') NULL DEFAULT NULL,
  PRIMARY KEY (`deal_id`),
  INDEX `FKi5ur0fp1gjnmdl5wc3cg6tsm7` (`house_id` ASC) VISIBLE,
  INDEX `FK8upm3li05g6r9bkuac5adumkr` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FK8upm3li05g6r9bkuac5adumkr`
    FOREIGN KEY (`member_id`)
    REFERENCES `ssafyhome`.`member` (`member_id`),
  CONSTRAINT `FKi5ur0fp1gjnmdl5wc3cg6tsm7`
    FOREIGN KEY (`house_id`)
    REFERENCES `ssafyhome`.`house` (`house_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 18763508
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`direct_message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`direct_message` (
  `direct_message_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `status` ENUM('READ', 'UNREAD') NOT NULL,
  `receiver` BIGINT NULL DEFAULT NULL,
  `sender` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`direct_message_id`),
  INDEX `FKhxojd8kqp2ic2aiac2o75ndwn` (`receiver` ASC) VISIBLE,
  INDEX `FKfopy6ut7lyjhiunvxq4b2exxb` (`sender` ASC) VISIBLE,
  CONSTRAINT `FKfopy6ut7lyjhiunvxq4b2exxb`
    FOREIGN KEY (`sender`)
    REFERENCES `ssafyhome`.`member` (`member_id`),
  CONSTRAINT `FKhxojd8kqp2ic2aiac2o75ndwn`
    FOREIGN KEY (`receiver`)
    REFERENCES `ssafyhome`.`member` (`member_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`follow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`follow` (
  `follow_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `follower` BIGINT NULL DEFAULT NULL,
  `following` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`follow_id`),
  INDEX `FKon174ytyau6iulr7uyxfoui4m` (`follower` ASC) VISIBLE,
  INDEX `FK3afh80u5bklfqjtbsmwgrn76` (`following` ASC) VISIBLE,
  CONSTRAINT `FK3afh80u5bklfqjtbsmwgrn76`
    FOREIGN KEY (`following`)
    REFERENCES `ssafyhome`.`member` (`member_id`),
  CONSTRAINT `FKon174ytyau6iulr7uyxfoui4m`
    FOREIGN KEY (`follower`)
    REFERENCES `ssafyhome`.`member` (`member_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`like_article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`like_article` (
  `like_article_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `article_id` BIGINT NULL DEFAULT NULL,
  `member_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`like_article_id`),
  INDEX `FKi9mjb30s79fl2gpjic4e0ej6q` (`article_id` ASC) VISIBLE,
  INDEX `FKohs7itiur0xxvgrqejgv98owk` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FKi9mjb30s79fl2gpjic4e0ej6q`
    FOREIGN KEY (`article_id`)
    REFERENCES `ssafyhome`.`article` (`article_id`),
  CONSTRAINT `FKohs7itiur0xxvgrqejgv98owk`
    FOREIGN KEY (`member_id`)
    REFERENCES `ssafyhome`.`member` (`member_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`like_deal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`like_deal` (
  `like_deal_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `deal_id` BIGINT NULL DEFAULT NULL,
  `member_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`like_deal_id`),
  INDEX `FKe69akqri3g8650uycit7sk9jw` (`deal_id` ASC) VISIBLE,
  INDEX `FKjf2585lxrh4qko5va8kss92f2` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FKe69akqri3g8650uycit7sk9jw`
    FOREIGN KEY (`deal_id`)
    REFERENCES `ssafyhome`.`deal` (`deal_id`),
  CONSTRAINT `FKjf2585lxrh4qko5va8kss92f2`
    FOREIGN KEY (`member_id`)
    REFERENCES `ssafyhome`.`member` (`member_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`like_house`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`like_house` (
  `like_house_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `house_id` BIGINT NULL DEFAULT NULL,
  `member_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`like_house_id`),
  INDEX `FKr8nhujnr4eq2idftjq1jy3b2q` (`house_id` ASC) VISIBLE,
  INDEX `FK77a9oea769cniwe15w0sw1pyf` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FK77a9oea769cniwe15w0sw1pyf`
    FOREIGN KEY (`member_id`)
    REFERENCES `ssafyhome`.`member` (`member_id`),
  CONSTRAINT `FKr8nhujnr4eq2idftjq1jy3b2q`
    FOREIGN KEY (`house_id`)
    REFERENCES `ssafyhome`.`house` (`house_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`like_region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`like_region` (
  `like_region_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `member_id` BIGINT NULL DEFAULT NULL,
  `region_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`like_region_id`),
  INDEX `FKe43xg3gjldifrirxfnarlbc9l` (`member_id` ASC) VISIBLE,
  INDEX `FKgxxjf8jufx0wwcj817otm41p0` (`region_id` ASC) VISIBLE,
  CONSTRAINT `FKe43xg3gjldifrirxfnarlbc9l`
    FOREIGN KEY (`member_id`)
    REFERENCES `ssafyhome`.`member` (`member_id`),
  CONSTRAINT `FKgxxjf8jufx0wwcj817otm41p0`
    FOREIGN KEY (`region_id`)
    REFERENCES `ssafyhome`.`region` (`region_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafyhome`.`notice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafyhome`.`notice` (
  `notice_id` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `modified_at` DATETIME(6) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `member_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`notice_id`),
  INDEX `FKnriaekshh15qoqnlhvqkj931e` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FKnriaekshh15qoqnlhvqkj931e`
    FOREIGN KEY (`member_id`)
    REFERENCES `ssafyhome`.`member` (`member_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
