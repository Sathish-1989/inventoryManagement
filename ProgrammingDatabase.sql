/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 8.4.2 : Database - inventory_management
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`inventory_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `inventory_management`;

/*Table structure for table `brand_master` */

DROP TABLE IF EXISTS `brand_master`;

CREATE TABLE `brand_master` (
  `brand_id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(50) NOT NULL,
  `brand_status` int DEFAULT '1',
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `brand_master` */

insert  into `brand_master`(`brand_id`,`brand_name`,`brand_status`) values 
(1,'LG',1),
(2,'LENOVO',1),
(3,'HP',1),
(4,'DELL',1),
(5,'ASUS',1),
(6,'TCL',0);

/*Table structure for table `category_master` */

DROP TABLE IF EXISTS `category_master`;

CREATE TABLE `category_master` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `category_status` int NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `category_master` */

insert  into `category_master`(`category_id`,`category_name`,`category_status`) values 
(1,'Monitor',1),
(2,'Keyboard',1),
(3,'Mouse',1),
(4,'Etherne Cable',1),
(5,'Speakers',1),
(6,'Laptop',1),
(7,'Camera',0);

/*Table structure for table `invoices` */

DROP TABLE IF EXISTS `invoices`;

CREATE TABLE `invoices` (
  `invoiceid` int NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(20) DEFAULT NULL,
  `invoice_date` date DEFAULT NULL,
  `sales_id_fk` int NOT NULL,
  `invoice_amount` float NOT NULL,
  `invoice_generatedby` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`invoiceid`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `invoices` */

insert  into `invoices`(`invoiceid`,`invoice_number`,`invoice_date`,`sales_id_fk`,`invoice_amount`,`invoice_generatedby`) values 
(1000,'INV_1130240001','2024-11-30',1,95.3,'1');

/*Table structure for table `product_master` */

DROP TABLE IF EXISTS `product_master`;

CREATE TABLE `product_master` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` text,
  `category_id_fk` int NOT NULL,
  `brand_id_fk` int NOT NULL,
  `product_status` int NOT NULL,
  `product_qty` int NOT NULL,
  `price_per_qty` float NOT NULL,
  `total_price` float NOT NULL,
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `ctime` date DEFAULT NULL,
  `mtime` date DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id_fk` (`category_id_fk`),
  KEY `brand_id_fk` (`brand_id_fk`),
  CONSTRAINT `product_master_ibfk_1` FOREIGN KEY (`category_id_fk`) REFERENCES `category_master` (`category_id`),
  CONSTRAINT `product_master_ibfk_2` FOREIGN KEY (`brand_id_fk`) REFERENCES `brand_master` (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1003 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `product_master` */

insert  into `product_master`(`product_id`,`product_name`,`category_id_fk`,`brand_id_fk`,`product_status`,`product_qty`,`price_per_qty`,`total_price`,`created_by`,`modified_by`,`ctime`,`mtime`) values 
(1000,'17 inch Monitor',1,4,1,6,95.3,571.8,1,1,'2024-11-03','2024-11-23'),
(1002,'LED LIGHT DUAL KEY STYLE',2,2,1,8,189.448,1515.58,1,NULL,'2024-12-01',NULL);

/*Table structure for table `role_master` */

DROP TABLE IF EXISTS `role_master`;

CREATE TABLE `role_master` (
  `role_id_pk` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  `role_status` int DEFAULT '0',
  PRIMARY KEY (`role_id_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `role_master` */

insert  into `role_master`(`role_id_pk`,`role_name`,`role_status`) values 
(1,'Super Admin',1),
(2,'Admin',1),
(3,'Employee',1),
(4,'Temporary Staff',0);

/*Table structure for table `sales_master` */

DROP TABLE IF EXISTS `sales_master`;

CREATE TABLE `sales_master` (
  `sales_id_pk` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(50) NOT NULL,
  `customer_mobile` char(12) NOT NULL,
  `customer_mailid` varchar(100) NOT NULL,
  `product_id_fk` int NOT NULL,
  `product_sold` int NOT NULL,
  `product_totprice` float NOT NULL,
  `invoice_generated` int DEFAULT '0',
  `generated_invoice_number` varchar(30) DEFAULT NULL,
  `sold_date` date NOT NULL,
  `sold_by` int NOT NULL,
  PRIMARY KEY (`sales_id_pk`),
  KEY `product_id_fk` (`product_id_fk`),
  CONSTRAINT `sales_master_ibfk_1` FOREIGN KEY (`product_id_fk`) REFERENCES `product_master` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `sales_master` */

insert  into `sales_master`(`sales_id_pk`,`customer_name`,`customer_mobile`,`customer_mailid`,`product_id_fk`,`product_sold`,`product_totprice`,`invoice_generated`,`generated_invoice_number`,`sold_date`,`sold_by`) values 
(1,'Harish','353896385214','harish@gmail.com',1000,1,95.3,1,'INV_1130240001','2024-11-24',2),
(2,'Ravi Teja','353896541234','raviteja19@gmail.com',1000,2,190.6,0,NULL,'2024-11-24',2),
(3,'Mani Iyer','353833282192','maniyer@gmail.com',1002,2,378.9,0,NULL,'2024-12-01',1);

/*Table structure for table `user_designation` */

DROP TABLE IF EXISTS `user_designation`;

CREATE TABLE `user_designation` (
  `des_id_pk` int NOT NULL AUTO_INCREMENT,
  `des_name` varchar(50) NOT NULL,
  `des_status` int NOT NULL,
  PRIMARY KEY (`des_id_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user_designation` */

insert  into `user_designation`(`des_id_pk`,`des_name`,`des_status`) values 
(1,'Owner',1),
(2,'Manager',1),
(3,'Cashier',1),
(4,'Stocker',1),
(5,'Customer Representative',1);

/*Table structure for table `user_master` */

DROP TABLE IF EXISTS `user_master`;

CREATE TABLE `user_master` (
  `user_id_pk` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` text,
  `emailId` varchar(100) NOT NULL,
  `employee_no` varchar(50) DEFAULT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `role_id_fk` int DEFAULT NULL,
  `des_id_fk` int NOT NULL,
  `user_status` int DEFAULT '1',
  `created_by` int DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `mtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id_pk`),
  KEY `fk_role` (`role_id_fk`),
  CONSTRAINT `fk_role` FOREIGN KEY (`role_id_fk`) REFERENCES `role_master` (`role_id_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `user_master` */

insert  into `user_master`(`user_id_pk`,`username`,`password`,`emailId`,`employee_no`,`firstname`,`lastname`,`dob`,`role_id_fk`,`des_id_fk`,`user_status`,`created_by`,`modified_by`,`ctime`,`mtime`) values 
(1,'admin@gmail.com','7b01cb30ac2d8d0397f7ebbf3604d1403ef97774001fc3144259e69b8020fe12','admin@gmail.com',NULL,'Chris','Tucker','1989-05-29',1,1,1,NULL,NULL,'2024-11-23 15:38:48','2024-11-23 19:59:44'),
(2,'jasonsath89@gmail.com','7b01cb30ac2d8d0397f7ebbf3604d1403ef97774001fc3144259e69b8020fe12','jasonsath89@gmail.com','EMP1000','Jason','Satham',NULL,2,2,1,1,1,'2024-11-23 15:50:52','2024-11-27 09:58:52'),
(4,'Manthony@gmail.com','7b01cb30ac2d8d0397f7ebbf3604d1403ef97774001fc3144259e69b8020fe12','Manthony@gmail.com','EMP1001','Mark ','Anthony',NULL,3,4,1,1,NULL,'2024-12-07 20:14:34','2024-12-07 20:14:34'),
(5,'parkerPete@gmail.com','7b01cb30ac2d8d0397f7ebbf3604d1403ef97774001fc3144259e69b8020fe12','parkerPete@gmail.com','EMP1002','Peter','Parker',NULL,3,2,1,1,1,'2024-12-07 20:15:46','2024-12-07 20:17:40'),
(6,'bruceB@gmail.com','7b01cb30ac2d8d0397f7ebbf3604d1403ef97774001fc3144259e69b8020fe12','bruceB@gmail.com','EMP1003','Bruce','Banner',NULL,2,2,1,1,NULL,'2024-12-07 20:17:31','2024-12-07 20:17:30');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
