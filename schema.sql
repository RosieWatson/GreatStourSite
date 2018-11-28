CREATE DATABASE `riverData`;
USE `riverData`;

# Dump of table govFloods
# ------------------------------------------------------------

DROP TABLE IF EXISTS `govFloods`;

CREATE TABLE `govFloods` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NULL DEFAULT NULL,
  `waterbody` varchar(50) DEFAULT NULL,
  `eaAreaName` varchar(50) DEFAULT NULL,
  `eaRegionName` varchar(50) DEFAULT NULL,
  `counties` json DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table govSensors
# ------------------------------------------------------------

DROP TABLE IF EXISTS `govSensors`;

CREATE TABLE `govSensors` (
  `id` varchar(25) unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `parameter` varchar(20) DEFAULT NULL,
  `qualifier` varchar(30) DEFAULT NULL,
  `stationId` varchar(10) DEFAULT NULL,
  `stationLabel` varchar(40) DEFAULT NULL,
  `value` double DEFAULT NULL,
  `unitName` varchar(10) DEFAULT NULL,
  `valueType` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`,`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
