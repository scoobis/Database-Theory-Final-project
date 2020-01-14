-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: 2dv513_final
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bikes`
--

DROP TABLE IF EXISTS `bikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bikes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `manfyear` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bikes`
--

LOCK TABLES `bikes` WRITE;
/*!40000 ALTER TABLE `bikes` DISABLE KEYS */;
INSERT INTO `bikes` VALUES (1,'BMC','Time-machine',2019,6000),(2,'BMC','Time-machine',2018,6000),(3,'BMC','Time-machine',2017,6000),(4,'BMC','Team-machine',2017,8000),(5,'BMC','Team-machine',2019,8000),(6,'Scott','Foil',2019,5000),(7,'Scott','Plasma',2019,9000),(8,'Trek','Madone',2019,7500),(9,'Trek','Emonda',2019,5500);
/*!40000 ALTER TABLE `bikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `distance` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Ironman','Kalmar','Full Distance','2017-08-12'),(2,'Ironman','Kalmar','Full Distance','2018-08-17'),(3,'Ironman','Kalmar','Full Distance','2019-08-16'),(4,'Ironman','Jönköping','Half Distance','2019-06-12'),(5,'Ironman','Jönköping','Half Distance','2018-06-09'),(6,'Ironman','Jönköping','Half Distance','2017-06-09'),(7,'Challenge','Roth','Full Distance','2019-07-16'),(8,'Challenge','Roth','Full Distance','2018-07-12'),(9,'Challenge','Roth','Full Distance','2017-07-07');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `mostpopularbikes`
--

DROP TABLE IF EXISTS `mostpopularbikes`;
/*!50001 DROP VIEW IF EXISTS `mostpopularbikes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `mostpopularbikes` AS SELECT 
 1 AS `brand`,
 1 AS `model`,
 1 AS `manfyear`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `run`
--

DROP TABLE IF EXISTS `run`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `run` (
  `username` varchar(100) NOT NULL,
  `pace` int(11) NOT NULL,
  `racing_shoe` varchar(100) NOT NULL,
  `training_shoe` varchar(100) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `run`
--

LOCK TABLES `run` WRITE;
/*!40000 ALTER TABLE `run` DISABLE KEYS */;
INSERT INTO `run` VALUES ('Biker123',265,'Nike 4%','Nike pegasus'),('Pelle12',206,'Saucony','Adidas'),('scoobis',200,'Nike 4%','Nike pegasus'),('Ulle',275,'Nike next %','Nike pegasus');
/*!40000 ALTER TABLE `run` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `swim`
--

DROP TABLE IF EXISTS `swim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `swim` (
  `username` varchar(100) NOT NULL,
  `pace` int(11) NOT NULL,
  `wetsuit` varchar(100) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `swim`
--

LOCK TABLES `swim` WRITE;
/*!40000 ALTER TABLE `swim` DISABLE KEYS */;
INSERT INTO `swim` VALUES ('Biker123',83,'Helix'),('Pelle12',71,'TYR'),('scoobis',72,'Helix'),('Ulle',76,'Helix');
/*!40000 ALTER TABLE `swim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(155) NOT NULL,
  `password` varchar(255) NOT NULL,
  `weight` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('Biker123','Jesper','Olsson','olsson@2dv513.com','$2b$12$QVXAMplURx96wieol..NB.feI2qFIko2Lsz.3i5dPZq7IfVFydk1O',65,170),('Pelle12','Pelle','persson','pelle@2dv513.com','$2b$12$wemU0AR/QZVTAdSFGGdzduhcSsvItP.pDi6syZUWHAhgMDRlwwYwe',0,0),('scoobis','Gabriel','Björlin','gabriel.bjorlin@gmail.com','$2b$12$8jBOjITz645EftmW1CO5c.Pmg8sg.LYGa/4EdTibDj.AQ84FKhjZm',70,180),('Ulle','Oscar','Oscarsson','oscar@mail.com','$2b$12$ZG0OGuhWo0h3f7iRM/Sa/.VBQxVi2mhMqmKIjtLBiDAQVWOBtSTeS',0,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersbikes`
--

DROP TABLE IF EXISTS `usersbikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usersbikes` (
  `username` varchar(100) NOT NULL,
  `bike_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersbikes`
--

LOCK TABLES `usersbikes` WRITE;
/*!40000 ALTER TABLE `usersbikes` DISABLE KEYS */;
INSERT INTO `usersbikes` VALUES ('scoobis',6),('scoobis',1),('Biker123',7),('Biker123',6),('Pelle12',8),('Pelle12',4),('Ulle',6),('Ulle',8);
/*!40000 ALTER TABLE `usersbikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersevents`
--

DROP TABLE IF EXISTS `usersevents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usersevents` (
  `username` varchar(100) NOT NULL,
  `event_id` int(11) NOT NULL,
  `swimTime` int(11) NOT NULL,
  `T1` int(11) NOT NULL,
  `bikeTime` int(11) NOT NULL,
  `T2` int(11) NOT NULL,
  `runTime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersevents`
--

LOCK TABLES `usersevents` WRITE;
/*!40000 ALTER TABLE `usersevents` DISABLE KEYS */;
INSERT INTO `usersevents` VALUES ('scoobis',1,3600,180,18000,210,10800),('scoobis',5,1800,120,9000,210,5000),('Biker123',7,3600,180,18000,210,10800),('Biker123',1,3600,180,18000,210,10800),('Biker123',4,3600,180,18000,210,10800),('Pelle12',7,3600,180,18000,210,10800),('Pelle12',2,3600,180,18000,210,10800),('Ulle',5,3600,180,18000,210,10800);
/*!40000 ALTER TABLE `usersevents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `mostpopularbikes`
--

/*!50001 DROP VIEW IF EXISTS `mostpopularbikes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `mostpopularbikes` AS select `b`.`brand` AS `brand`,`b`.`model` AS `model`,`b`.`manfyear` AS `manfyear` from (`bikes` `b` join `usersbikes` `ub` on((`b`.`id` = `ub`.`bike_id`))) group by `b`.`model` order by count(0) desc limit 10 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-14 21:00:36
