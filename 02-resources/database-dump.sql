-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.6.4-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for aplikacija
CREATE DATABASE IF NOT EXISTS `aplikacija` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `aplikacija`;

-- Dumping structure for table aplikacija.administrator
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table aplikacija.administrator: ~0 rows (approximately)
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

-- Dumping structure for table aplikacija.aerodrom
CREATE TABLE IF NOT EXISTS `aerodrom` (
  `aerodrom_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `naziv` varchar(32) NOT NULL,
  `drzava` varchar(32) NOT NULL,
  `geografska_sirina` float NOT NULL DEFAULT 0,
  `geografska_duzina` float NOT NULL DEFAULT 0,
  `kod` varchar(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`aerodrom_id`),
  UNIQUE KEY `uq_aerodrom_kod` (`kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table aplikacija.aerodrom: ~0 rows (approximately)
/*!40000 ALTER TABLE `aerodrom` DISABLE KEYS */;
/*!40000 ALTER TABLE `aerodrom` ENABLE KEYS */;

-- Dumping structure for table aplikacija.cvoriste
CREATE TABLE IF NOT EXISTS `cvoriste` (
  `cvoriste_id` int(11) unsigned NOT NULL,
  `aerodrom_id` int(11) unsigned NOT NULL,
  `vreme_leta` int(100) unsigned NOT NULL,
  `vreme_zadrzavnaja` int(100) unsigned NOT NULL,
  `linija_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`cvoriste_id`),
  KEY `fk_cvoriste_aerodrom_id` (`aerodrom_id`),
  KEY `fk_cvoriste_linija_id` (`linija_id`),
  CONSTRAINT `fk_cvoriste_aerodrom_id` FOREIGN KEY (`aerodrom_id`) REFERENCES `aerodrom` (`aerodrom_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_cvoriste_linija_id` FOREIGN KEY (`linija_id`) REFERENCES `linija` (`linija_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table aplikacija.cvoriste: ~0 rows (approximately)
/*!40000 ALTER TABLE `cvoriste` DISABLE KEYS */;
/*!40000 ALTER TABLE `cvoriste` ENABLE KEYS */;

-- Dumping structure for table aplikacija.linija
CREATE TABLE IF NOT EXISTS `linija` (
  `linija_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `naziv` varchar(50) NOT NULL DEFAULT '0',
  `dan` varchar(20) NOT NULL DEFAULT '0',
  `vreme_polaska` time NOT NULL DEFAULT '00:00:00',
  `polazni_aerodrom_id` int(11) unsigned NOT NULL DEFAULT 0,
  `cena` int(32) unsigned NOT NULL,
  `vip_cena` int(32) unsigned NOT NULL,
  PRIMARY KEY (`linija_id`),
  KEY `fk_linija_polazni_aerodrom_id` (`polazni_aerodrom_id`),
  CONSTRAINT `fk_linija_polazni_aerodrom_id` FOREIGN KEY (`polazni_aerodrom_id`) REFERENCES `aerodrom` (`aerodrom_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table aplikacija.linija: ~0 rows (approximately)
/*!40000 ALTER TABLE `linija` DISABLE KEYS */;
/*!40000 ALTER TABLE `linija` ENABLE KEYS */;

-- Dumping structure for table aplikacija.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(25) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  `forname` varchar(64) NOT NULL DEFAULT '0',
  `surname` varchar(64) NOT NULL DEFAULT '0',
  `phone_number` varchar(24) NOT NULL DEFAULT '0',
  `address` text NOT NULL,
  `vip` tinyint(1) unsigned DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`),
  UNIQUE KEY `uq_user_phone_number` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table aplikacija.user: ~0 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
