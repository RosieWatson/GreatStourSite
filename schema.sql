CREATE DATABASE `riverData`;
USE `riverData`;

# Dump of table govFloods
# ------------------------------------------------------------

DROP TABLE IF EXISTS `govFloods`;

CREATE TABLE `govFloods` (
  `id` int(11) unsigned NOT NULL,
  `timestamp` int(11) DEFAULT NULL,
  `waterbody` varchar(50) DEFAULT NULL,
  `eaAreaName` varchar(50) DEFAULT NULL,
  `eaRegionName` varchar(50) DEFAULT NULL,
  `counties` varchar(1024) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `message` varchar(2048) DEFAULT NULL,
  `severity` varchar(50) DEFAULT NULL,
  `severityLevel` int(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table govSensors
# ------------------------------------------------------------

DROP TABLE IF EXISTS `govSensors`;

CREATE TABLE `govSensors` (
  `id` varchar(50) NOT NULL,
  `timestamp` int(11) NOT NULL,
  `parameter` varchar(20) DEFAULT NULL,
  `qualifier` varchar(30) DEFAULT NULL,
  `stationId` varchar(50) DEFAULT NULL,
  `stationLabel` varchar(40) DEFAULT NULL,
  `value` double DEFAULT NULL,
  `unitName` varchar(10) DEFAULT NULL,
  `valueType` varchar(15) DEFAULT NULL,
  `latestReading` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`latestReading`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table govStations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `govStations`;

CREATE TABLE `govStations` (
  `id` varchar(11) NOT NULL,
  `timestamp` int(11) NOT NULL,
  `riverName` varchar(20) DEFAULT NULL,
  `eaAreaName` varchar(55) DEFAULT NULL,
  `eaRegionName` varchar(20) DEFAULT NULL,
  `description` varchar(55) DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `notation` varchar(55) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table mqttSensors
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mqttSensors`;

CREATE TABLE `mqttSensors` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` int(11) NOT NULL,
  `deviceID` varchar(21) DEFAULT NULL,
  `value` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `deviceTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `floodPercentage` double DEFAULT NULL,
  PRIMARY KEY (`id`,`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table subscribers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `subscribers`;

CREATE TABLE `subscribers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` int(11) NOT NULL,
  `name` varchar(55) DEFAULT NULL,
  `email` varchar(1024) DEFAULT NULL,
  `postcode` varchar(7) DEFAULT NULL,
  `lastAlerted` int(11) DEFAULT NULL,
  `lastAlertStates` varchar(1024)  DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
